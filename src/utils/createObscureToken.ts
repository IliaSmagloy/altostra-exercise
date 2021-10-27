export function createObscureToken(token:string) {
    const obscuredToken = [ ...token ];
    for(let index = 0; index<obscuredToken.length-4; index++){
        if(obscuredToken[index]!=='-'){
            obscuredToken[index] = '*';
        }
    }
    const obscuredTokenInStringFormat = obscuredToken.join('');
    return obscuredTokenInStringFormat;
}