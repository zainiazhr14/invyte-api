export const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    const safeLength = Math.max(0, Math.floor(length));
    
    for (let i = 0; i < safeLength; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      
      result += characters.charAt(randomIndex);
    }

    return result;
}

export const generateNumericOTP = (length: number) => {
    const characters = '0123456789';
    let result = '';
    const charactersLength = characters.length;
    const safeLength = Math.max(0, Math.floor(length));
    
    for (let i = 0; i < safeLength; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
    }
    return result;
}