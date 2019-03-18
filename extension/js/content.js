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
		// Click Buy now
		this.buyNowButtonSelector$
		.do(item => {
			const $item = $(item);
			utils.simulateClick($item);
		})
		// Add purchase amount
		.switchMap(() => this.purchaseAmountInputSelector$)
		.do((item) => {
			const $item = $(item);
			utils.simulateClick($item);
			utils.simulateTextInput($item, CONFIG.tokePurchaseAmount);
		})
		.delay(CONFIG.delayFocusBlur)
		.do((item) => {
			const $item = $(item);
			utils.simulateBlur($item);
		})
		// Focus verification box
		.switchMap(() => this.verificationCodeInputSelector$)
		.do((item) => {
			const $item = $(item);
			utils.simulateClick($item);
		})
		// Wait for user to enter 4 characters
		.switchMap((item) => {
			return utils.listenForKeyUpEvent(item);
		})
		.filter(item => item.target.value.length >= 4)
		.switchMap(() => this.confirmPurchaseButtonSelector$)
		// Click Purchase button
		.do((item) => {
			const $item = $(item);
			utils.simulateClick($item);
		})
		.subscribe(() => {
			console.log('AA');
		});
	}
}

const main = new Main();