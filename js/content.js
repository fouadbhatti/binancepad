class Main {
  constructor() {
  	 this.purchaseAmountInputSelector$ = utils.onElementArrive(CONFIG.purchaseAmountInputSelector);
  	 this.verificationCodeInputSelector$ = utils.onElementArrive(CONFIG.verificationCodeInputSelector);
		 this.confirmPurchaseButtonSelector$ = utils.onElementArrive(CONFIG.confirmPurchaseButtonSelector);
		 this.buyNowButtonSelector$ = utils.onElementArrive(CONFIG.buyNowButtonSelector);
		 this.onTokeSaleStarted$ = Rx.Observable.of(10);

		this.eventChain();
	}

	eventChain() {
		// this.onTokeSaleStarted
		// 	.subscribe(() => {
		// 		location.reload();
		// 	});
		this.buyNowButtonSelector$
		.do(item => {
			// Click Buy now
			const $item = $(item);
			utils.simulateClick($item);
		})
		.switchMap(() => this.purchaseAmountInputSelector$)
		.do((item) => {
			// Add purchase amount
			const $item = $(item);
			utils.simulateClick($item);
			utils.simulateTextInput($item, CONFIG.tokePurchaseAmount);
		})
		.switchMap(() => this.verificationCodeInputSelector$)
		.do((item) => {
			// Focus verification box
			const $item = $(item);
			utils.simulateClick($item);
		})
		.subscribe(() => {
			console.log('AA');
		});
	}
}

const main = new Main();