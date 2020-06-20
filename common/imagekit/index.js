import ImageKit from 'imagekit-javascript'

var imagekit = new ImageKit({
    publicKey : process.env.VUE_APP_IMGKIT_PUBKEY,
    urlEndpoint : process.env.VUE_APP_IMGKIT_ENDPOINT,
    authenticationEndpoint : process.env.VUE_APP_SERVER_AUTH_IMGKIT,
});

export default imagekit
