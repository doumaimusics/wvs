function delAccount(account) {
	//删除账号
	var accounts = getAccounts();
	accounts.forEach(function(n, i) {
		if (n.name == account.name) {
			accounts.splice(i, 1);
			return false;
		}
	});
	setAccounts(accounts);
};

function addAccount(account) {
	//添加账号
	var accounts = getAccounts();
	accounts.forEach(function(n, i) {
		if (n.name == account.name) {
			accounts.splice(i, 1);
			return false;
		}
	});
	accounts.unshift(account);
	setAccounts(accounts);
};

function getAccounts() {
	//获取所有账号
	var users = plus.storage.getItem("accounts");
	if (users) {
		return JSON.parse(users);
	}
	return [];
};

function setAccounts(accounts) {
	//保存账号
	plus.storage.setItem("accounts", JSON.stringify(accounts));
};
