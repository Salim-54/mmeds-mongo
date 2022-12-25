function generateTransactionId() {
    const timestamp = Date.now();
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const randomString = Math.random().toString(36).substring(2, 7);
    const token = `${timestamp}-${randomNumber}-${randomString}`;

    return token;
}
export default generateTransactionId;