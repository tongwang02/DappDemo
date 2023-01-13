Index = {
    web3Provider: null,
    contracts: {},
    initWeb3: function () {
        if (typeof web3 !== 'undefined') {
            Index.web3Provider = web3.currentProvider;
        } else {
            Index.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(Index.web3Provider);
        Index.initContract();
    },

    initContract: function () {
        $.getJSON('Voting.json', function (data) {
            var Artifact = data;
            Index.contracts.Voting = TruffleContract(Artifact);
            Index.contracts.Voting.setProvider(Index.web3Provider);
        });
        $.getJSON('TokenERC20.json', function (data) {
            var Artifact = data;
            Index.contracts.Token = TruffleContract(Artifact);
            Index.contracts.Token.setProvider(Index.web3Provider);
        });
        Index.bindEvents();
    },
    getHello: function () {
        web3.eth.getAccounts(function (error, accounts) {
            if (error) {
                console.log(error);
            }
            var account = accounts[0];
            console.log(account);
            $("#balanceAddress").val(account);
            web3.eth.getBalance(account, (function callback(err, value) {
                if (!err) {
                    console.log(value.toString(10)); // '1000000000000'
                    $("#balanceCoin").val(value / 10e17 + "eth");
                } else {
                    console.log(err);
                }
            }));
            Index.contracts.Voting.deployed().then(function (instance) {
                VotingInstance = instance;
                //get RegisterStartTime
                VotingInstance.gethello.call({from: account}).then((result) => {
                    $("#identity").val(result);
                })
            });
            Index.contracts.Token.deployed().then(function (instance) {
                TokenInstance = instance;
                //get RegisterStartTime
                TokenInstance.balanceOfAccount(account).call({from: account}).then(
                    (result) => {
                        $("#otherCoins").val(result);
                    })
            });
        });
        return false;
    },
    bindEvents: function () {
        $(document).on('click', '.btn-block', Index.getHello);
    }
};

$(function () {
    $(window).load(function () {
        Index.initWeb3();
    });
});











