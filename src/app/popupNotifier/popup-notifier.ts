import { AlertController, LoadingController } from '@ionic/angular';

export class PopupNotifier {
    private loadingSpinner: HTMLIonLoadingElement
    loadingController: LoadingController;
    alertController: AlertController;

    constructor() {
        this.loadingController = new LoadingController()
        this.alertController = new AlertController()
    }

    async showLoadingSpinner() {
        this.loadingSpinner = await this.loadingController.create({
            message: 'Loading...'
        })
        await this.loadingSpinner.present()
    }

    async hideLoadingSpinner() {
        await this.loadingSpinner.dismiss()
    }
    
    async showErrorAlert(status, msg) {
        const alert = await this.alertController.create({
            header: 'Error '+status,
            message: msg,
            buttons: [{
                text: 'Reload',
                handler: () => window.location.reload()
            }]
        });

        await alert.present()
    }
}