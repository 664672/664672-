// contact.js
Page({
  data: {
    name: '',
    phone: '',
    contactId: null
  },

  onLoad(options) {
    this.setData({ contactId: options.contactId }); // 获取传递的联系人 ID
    this.loadContact(options.contactId); // 加载联系人信息
  },

  loadContact(contactId) {
    const db = wx.cloud.database();
    const contactsCollection = db.collection('contacts');

    contactsCollection.doc(contactId).get().then(res => {
      const { name, phone } = res.data;
      this.setData({ name, phone });
    }).catch(err => {
      wx.showToast({
        title: '加载失败',
        icon: 'none'
      });
      console.error(err);
    });
  },

  onNameChange(e) {
    this.setData({ name: e.detail.value });
  },

  onPhoneChange(e) {
    this.setData({ phone: e.detail.value });
  },

  updateContact() {
    const { name, phone, contactId } = this.data;

    if (!name || !phone) {
      wx.showToast({
        title: '请填写完整信息',
        icon: 'none'
      });
      return;
    }

    const db = wx.cloud.database();
    const contactsCollection = db.collection('contacts');

    contactsCollection.doc(contactId).update({
      data: { name, phone }
    }).then(() => {
      wx.showToast({
        title: '联系人已修改',
        icon: 'success'
      });
      setTimeout(() => {
        wx.navigateBack(); // 延迟返回上一个页面，确保数据更新完成
      }, 500);
    }).catch(err => {
      wx.showToast({
        title: '修改失败',
        icon: 'none'
      });
      console.error(err);
    });
  },

  deleteContact() {
    const { contactId } = this.data;

    const db = wx.cloud.database();
    const contactsCollection = db.collection('contacts');

    wx.showModal({
      title: '确认删除',
      content: '确定要删除该联系人吗？',
      success: (res) => {
        if (res.confirm) {
          contactsCollection.doc(contactId).remove().then(() => {
            wx.showToast({
              title: '联系人已删除',
              icon: 'success'
            });
            setTimeout(() => {
              wx.navigateBack(); // 延迟返回，确保删除操作完成
            }, 500);
          }).catch(err => {
            wx.showToast({
              title: '删除失败',
              icon: 'none'
            });
            console.error(err);
          });
        }
      }
    });
  }
});
