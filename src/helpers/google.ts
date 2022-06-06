import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client({
    clientId: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`
});

export const TakeGoogleUserFromToken = async (token: string) => {
    console.log(`###token ${token}`)
    const ticket = await googleClient.verifyIdToken({
        idToken: token,
        audience: `${process.env.GOOGLE_CLIENT_ID}`,
    });

    const payload = await ticket.getPayload();

    return payload;
};