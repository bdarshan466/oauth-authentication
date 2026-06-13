import express from 'express';
import passport from 'passport';
import auth from './auth.js';
const router = express.Router();

// Initiates the Google OAuth 2.0 authentication flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], accessType: 'offline', prompt: 'consent' }));

// Callback URL for handling the OAuth 2.0 response
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    // Successful authentication, redirect or handle the user as desired
    res.redirect('/health');
});

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get("/protected", auth, (req, res) => {
    res.json({ message: "Protected data fetched successfully", user: req.user });
});

export default router;