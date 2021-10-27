import AccessService from './server';

const accessService = new AccessService();

(async () => {
    try {
        console.log('AccessService started listening on port 3000');
        await accessService.start();
    } catch (error) {
        console.log('An unexpected error occured');
        console.log(JSON.stringify(error));
    }
})();