// index.js
Page({
  data: {
    contacts: [],
    searchQuery: '',
    filteredContacts: []
  },

  onLoad() {
    // 初始化云开发
    wx.cloud.init({
      env: 'g664672-1g79vnrxbafc8a64' // 替换为你的云开发环境 ID
    });
    this.loadContacts(); // 初次加载联系人
  },

  onShow() {
    this.loadContacts(); // 每次页面显示时重新加载联系人
  },

  loadContacts() {
    const db = wx.cloud.database();
    const contactsCollection = db.collection('contacts');
    
    // 从数据库获取联系人
    contactsCollection.get().then(res => {
      this.setData({
        contacts: res.data,
        filteredContacts: res.data // 默认显示所有联系人
      });
    }).catch(err => {
      console.error('获取联系人失败:', err);
    });
  },

  // 搜索联系人
  onSearchChange(e) {
    const query = e.detail.value.toLowerCase();
    const filteredContacts = this.data.contacts.filter(contact =>
      contact.name.toLowerCase().includes(query)
    );
    this.setData({
      searchQuery: query,
      filteredContacts
    });
  },

  // 跳转到添加联系人页面
  goToAddContact() {
    wx.navigateTo({
      url: '/pages/addContact/addContact' // 假设添加联系人页面的路径为 /pages/addContact/addContact
    });
  },

  // 跳转到联系人详情页面
  goToContactDetail(e) {
    const contactId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/addContact/addContact?contactId=${contactId}` // 跳转到联系人详情页面
    });
  }
});
