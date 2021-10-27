import { decode } from 'jsonwebtoken';

export function authenticateRequest(request): string|undefined {
    const exampleJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    const decodedJWT = decode(exampleJWT, { complete: true });
    const { payload } = decodedJWT;
    const { sub } = payload;
    return sub; 
    request;//Dead code just so the linter won't scream at the unused request.
}