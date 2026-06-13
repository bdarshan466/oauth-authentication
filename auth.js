import { OAuth2Client } from "google-auth-library";
import "dotenv/config";
import User from "./user.model.js";

const auth = async (req, res, next) => {
    try {
        // find the user exist or not in our database 
        const user = await User.findOne({ email: "darshan@softcolon.com" });

        console.log("user", user);

        if (!user) {
            return res.status(401).json({ error: "Google account not linked or unauthorized" });
        }

        // Initialize Google's OAuth2 client
        const oauth2Client = new OAuth2Client({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        });

        // 4. Provide both tokens to the client
        oauth2Client.setCredentials({
            access_token: user.get("accessToken"),
            refresh_token: user.get("refreshToken"),
        });

        // 5. Force a token check / refresh using Google's library
        // This automatically handles expiration checks and hits Google's token endpoint if needed
        const tokenInfo = await oauth2Client.getAccessToken();

        // 6. If Google rotated or updated the access token, save the new one to your database
        if (tokenInfo.token && tokenInfo.token !== user.get("accessToken")) {
            user.set("accessToken", tokenInfo.token);
            await user.save();
        }

        // 7. Attach the valid oauth2Client to the request context for route use
        req.googleClient = oauth2Client;
        next();

    }
    catch (error) {
        console.error("Google Token Verification Failed:", error.message);
        return res.status(401).json({ error: "Invalid or expired Google Token. Please re-authenticate." });
    }
}

export default auth;

