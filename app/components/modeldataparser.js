import Ember from 'ember';
import { request } from 'ic-ajax';

export default Ember.Component.extend({
  actions: {
    upload: function() {
      var _this = this;s
      var formData = new FormData();
      formData.append("file", this.$('input')[0].files[0]);
      var url = this.get('url');
      request('/your-api-end-point-which-accepts-csv', {
        type: 'POST',
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        xhr: function() {
          var xhr;
          xhr = Ember.$.ajaxSettings.xhr();
          xhr.upload.onprogress = function(evt) {
            return _this.set('uploadProgress', evt.loaded / evt.total * 100);
          };
          return xhr;
        }
      }).then(function() {
        console.log('manage success here');
      }, function() {
        console.log('manage failure');
      });
    }
  }
});
