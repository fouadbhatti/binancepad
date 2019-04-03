class Main {
  constructor() {
    this.watchAndClick("button:contains('Click to Complete Human-Machine Verification'),input:contains('Click to Complete Human-Machine Verification')");

    utils.onElementArrive('input[type="number"],input[type="text"]').then((el)=> {
      utils.simulateTextInput($(el), CONFIG.purchaseAmount);
      setTimeout(()=> {
        this.watchAndClick("button:contains('Purchase Now'),input:contains('Purchase Now')");
      },10);
    });

    this.watchAndInputTradingPassword();
  }

  watchAndClick(selector) {
    utils.onElementArrive(selector).then((el)=> {
      utils.simulateClick(el);
    });
  }

  watchAndInputTradingPassword() {
    document.arrive(".ant-spin-container", { existing: true, fireOnAttributesModification:true }, (el) => {
      let $inputs = $(el).find("input");

      if ($inputs.length === 6) {
        $inputs.each(function(index) {
          utils.simulateTextInput($(this), CONFIG.tradingPassword[index]);
        });

        document.arrive("button:contains('Confirm'),input:contains('Confirm')", { existing: true, onceOnly: false, fireOnAttributesModification:true }, (el) => {
          utils.simulateClick(el);
        });
      }
    });
  }
}

const main = new Main();