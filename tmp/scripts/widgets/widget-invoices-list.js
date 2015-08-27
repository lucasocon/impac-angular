(function () {
var module;

module = angular.module('maestrano.analytics.widget-invoices-list', ['maestrano.assets']);

module.controller('WidgetInvoicesListCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'Utilities', '$filter', function($scope, DhbAnalyticsSvc, Utilities, $filter) {
    var getSettingsCount, w;
    w = $scope.widget;
    w.initContext = function() {
      return $scope.isDataFound = !_.isEmpty(w.content.entities);
    };
    $scope.entityType = w.metadata.entity;
    $scope.entityTypeCap = Utilities.capitalize(w.metadata.entity);
    if (w.metadata.order_by === 'name' || w.metadata.order_by === 'total_invoiced') {
      $scope.orderBy = '';
    } else {
      $scope.orderBy = _.last(w.metadata.order_by.split('_')).concat(" ");
    }
    $scope.getInvoices = function(entity) {
      var count, tooltip;
      tooltip = ["<strong>" + entity.name + "</strong>"];
      count = 1;
      angular.forEach(entity.invoices, function(i) {
        var paid, txn;
        if (i.transaction_no !== "") {
          txn = " (" + i.transaction_no + ")";
        } else {
          txn = "";
        }
        if (i.tooltip_status === "partially paid") {
          paid = " (" + $filter('mnoCurrency')(i.paid, i.currency, false) + " over " + $filter('mnoCurrency')(i.invoiced, i.currency, false) + ")";
        } else {
          paid = " (" + $filter('mnoCurrency')(i.invoiced, i.currency, false) + ")";
        }
        tooltip.push("#" + count + txn + " - " + i.tooltip_status + paid);
        return count++;
      });
      return tooltip.join("<br />");
    };
    getSettingsCount = function() {
      if (w.settings != null) {
        return w.settings.length;
      } else {
        return 0;
      }
    };
    $scope.$watch(getSettingsCount, function(total) {
      if (total === 1) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetInvoicesList', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("invoices");
      return element.addClass("list");
    },
    controller: 'WidgetInvoicesListCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWludm9pY2VzLWxpc3QuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsMENBQWYsRUFBMEQsQ0FBQyxrQkFBRCxDQUExRDs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQix3QkFBbEIsRUFBMkM7RUFDekMsUUFEeUMsRUFDL0IsaUJBRCtCLEVBQ1osV0FEWSxFQUNDLFNBREQsRUFFekMsU0FBQyxNQUFELEVBQVMsZUFBVCxFQUEwQixTQUExQixFQUFxQyxPQUFyQztBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsU0FBQTthQUNkLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLENBQUMsQ0FBQyxDQUFDLE9BQUYsQ0FBVSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQXBCO0lBRFI7SUFJaEIsTUFBTSxDQUFDLFVBQVAsR0FBb0IsQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUMvQixNQUFNLENBQUMsYUFBUCxHQUF1QixTQUFTLENBQUMsVUFBVixDQUFxQixDQUFDLENBQUMsUUFBUSxDQUFDLE1BQWhDO0lBQ3ZCLElBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFYLEtBQXVCLE1BQXZCLElBQWlDLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBWCxLQUF1QixnQkFBM0Q7TUFDRSxNQUFNLENBQUMsT0FBUCxHQUFpQixHQURuQjtLQUFBLE1BQUE7TUFJRSxNQUFNLENBQUMsT0FBUCxHQUFpQixDQUFDLENBQUMsSUFBRixDQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQXBCLENBQTBCLEdBQTFCLENBQVAsQ0FBc0MsQ0FBQyxNQUF2QyxDQUE4QyxHQUE5QyxFQUpuQjs7SUFNQSxNQUFNLENBQUMsV0FBUCxHQUFxQixTQUFDLE1BQUQ7QUFFbkIsVUFBQTtNQUFBLE9BQUEsR0FBVSxDQUFDLFVBQUEsR0FBYSxNQUFNLENBQUMsSUFBcEIsR0FBMkIsV0FBNUI7TUFDVixLQUFBLEdBQU07TUFDTixPQUFPLENBQUMsT0FBUixDQUFnQixNQUFNLENBQUMsUUFBdkIsRUFBaUMsU0FBQyxDQUFEO0FBRS9CLFlBQUE7UUFBQSxJQUFJLENBQUMsQ0FBQyxjQUFGLEtBQW9CLEVBQXhCO1VBQ0UsR0FBQSxHQUFNLElBQUEsR0FBTyxDQUFDLENBQUMsY0FBVCxHQUEwQixJQURsQztTQUFBLE1BQUE7VUFHRSxHQUFBLEdBQU0sR0FIUjs7UUFLQSxJQUFJLENBQUMsQ0FBQyxjQUFGLEtBQW9CLGdCQUF4QjtVQUNFLElBQUEsR0FBTyxJQUFBLEdBQU8sT0FBQSxDQUFRLGFBQVIsQ0FBQSxDQUF1QixDQUFDLENBQUMsSUFBekIsRUFBOEIsQ0FBQyxDQUFDLFFBQWhDLEVBQXlDLEtBQXpDLENBQVAsR0FBeUQsUUFBekQsR0FBb0UsT0FBQSxDQUFRLGFBQVIsQ0FBQSxDQUF1QixDQUFDLENBQUMsUUFBekIsRUFBa0MsQ0FBQyxDQUFDLFFBQXBDLEVBQTZDLEtBQTdDLENBQXBFLEdBQTBILElBRG5JO1NBQUEsTUFBQTtVQUdFLElBQUEsR0FBTyxJQUFBLEdBQU8sT0FBQSxDQUFRLGFBQVIsQ0FBQSxDQUF1QixDQUFDLENBQUMsUUFBekIsRUFBa0MsQ0FBQyxDQUFDLFFBQXBDLEVBQTZDLEtBQTdDLENBQVAsR0FBNkQsSUFIdEU7O1FBS0EsT0FBTyxDQUFDLElBQVIsQ0FBYSxHQUFBLEdBQU0sS0FBTixHQUFjLEdBQWQsR0FBb0IsS0FBcEIsR0FBNEIsQ0FBQyxDQUFDLGNBQTlCLEdBQStDLElBQTVEO2VBQ0EsS0FBQTtNQWIrQixDQUFqQztBQWVBLGFBQU8sT0FBTyxDQUFDLElBQVIsQ0FBYSxRQUFiO0lBbkJZO0lBNkJyQixnQkFBQSxHQUFtQixTQUFBO01BQ2pCLElBQUcsa0JBQUg7QUFDRSxlQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FEcEI7T0FBQSxNQUFBO0FBR0UsZUFBTyxFQUhUOztJQURpQjtJQU1uQixNQUFNLENBQUMsTUFBUCxDQUFjLGdCQUFkLEVBQWdDLFNBQUMsS0FBRDtNQUM5QixJQUFtQixLQUFBLEtBQVMsQ0FBNUI7ZUFBQSxDQUFDLENBQUMsV0FBRixDQUFBLEVBQUE7O0lBRDhCLENBQWhDO0FBR0EsV0FBTztFQXREVCxDQUZ5QztDQUEzQzs7QUE0REEsTUFBTSxDQUFDLFNBQVAsQ0FBaUIsb0JBQWpCLEVBQXVDLFNBQUE7QUFDckMsU0FBTztJQUNMLFFBQUEsRUFBVSxHQURMO0lBRUwsSUFBQSxFQUFNLFNBQUMsS0FBRCxFQUFRLE9BQVI7TUFDSixPQUFPLENBQUMsUUFBUixDQUFpQixVQUFqQjthQUNBLE9BQU8sQ0FBQyxRQUFSLENBQWlCLE1BQWpCO0lBRkksQ0FGRDtJQUtKLFVBQUEsRUFBWSx3QkFMUjs7QUFEOEIsQ0FBdkMiLCJmaWxlIjoid2lkZ2V0cy93aWRnZXQtaW52b2ljZXMtbGlzdC5qcy5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdtYWVzdHJhbm8uYW5hbHl0aWNzLndpZGdldC1pbnZvaWNlcy1saXN0JyxbJ21hZXN0cmFuby5hc3NldHMnXSlcblxubW9kdWxlLmNvbnRyb2xsZXIoJ1dpZGdldEludm9pY2VzTGlzdEN0cmwnLFtcbiAgJyRzY29wZScsICdEaGJBbmFseXRpY3NTdmMnLCAnVXRpbGl0aWVzJywgJyRmaWx0ZXInLFxuICAoJHNjb3BlLCBEaGJBbmFseXRpY3NTdmMsIFV0aWxpdGllcywgJGZpbHRlcikgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgICRzY29wZS5pc0RhdGFGb3VuZCA9ICFfLmlzRW1wdHkody5jb250ZW50LmVudGl0aWVzKVxuXG4gICAgIyBObyBuZWVkIHRvIHB1dCB0aGlzIHVuZGVyIGluaXRDb250ZXh0IGJlY2F1c2UgaXQgd29uJ3QgY2hhbmdlIGFmdGVyIGEgc2V0dGluZ3MgdXBkYXRlXG4gICAgJHNjb3BlLmVudGl0eVR5cGUgPSB3Lm1ldGFkYXRhLmVudGl0eVxuICAgICRzY29wZS5lbnRpdHlUeXBlQ2FwID0gVXRpbGl0aWVzLmNhcGl0YWxpemUody5tZXRhZGF0YS5lbnRpdHkpXG4gICAgaWYgdy5tZXRhZGF0YS5vcmRlcl9ieSA9PSAnbmFtZScgfHwgdy5tZXRhZGF0YS5vcmRlcl9ieSA9PSAndG90YWxfaW52b2ljZWQnXG4gICAgICAkc2NvcGUub3JkZXJCeSA9ICcnXG4gICAgZWxzZSAgXG4gICAgICAjIHJldHVybmVkIGJ5IEltcGFjITogXCJ0b3RhbF9zb21ldGhpbmdcIlxuICAgICAgJHNjb3BlLm9yZGVyQnkgPSBfLmxhc3Qody5tZXRhZGF0YS5vcmRlcl9ieS5zcGxpdCgnXycpKS5jb25jYXQoXCIgXCIpXG5cbiAgICAkc2NvcGUuZ2V0SW52b2ljZXMgPSAoZW50aXR5KSAtPlxuICAgICAgIyBSZXR1cm5zIHRoZSBpbnZvaWNlcyBmb3IgYSBnaXZlbiBjdXN0b21lci9zdXBwbGllclxuICAgICAgdG9vbHRpcCA9IFtcIjxzdHJvbmc+XCIgKyBlbnRpdHkubmFtZSArIFwiPC9zdHJvbmc+XCJdXG4gICAgICBjb3VudD0xXG4gICAgICBhbmd1bGFyLmZvckVhY2goZW50aXR5Lmludm9pY2VzLCAoaSkgLT5cblxuICAgICAgICBpZiAoaS50cmFuc2FjdGlvbl9ubyAhPSBcIlwiKVxuICAgICAgICAgIHR4biA9IFwiIChcIiArIGkudHJhbnNhY3Rpb25fbm8gKyBcIilcIlxuICAgICAgICBlbHNlXG4gICAgICAgICAgdHhuID0gXCJcIlxuXG4gICAgICAgIGlmIChpLnRvb2x0aXBfc3RhdHVzID09IFwicGFydGlhbGx5IHBhaWRcIilcbiAgICAgICAgICBwYWlkID0gXCIgKFwiICsgJGZpbHRlcignbW5vQ3VycmVuY3knKShpLnBhaWQsaS5jdXJyZW5jeSxmYWxzZSkgKyBcIiBvdmVyIFwiICsgJGZpbHRlcignbW5vQ3VycmVuY3knKShpLmludm9pY2VkLGkuY3VycmVuY3ksZmFsc2UpICsgXCIpXCJcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHBhaWQgPSBcIiAoXCIgKyAkZmlsdGVyKCdtbm9DdXJyZW5jeScpKGkuaW52b2ljZWQsaS5jdXJyZW5jeSxmYWxzZSkgKyBcIilcIlxuXG4gICAgICAgIHRvb2x0aXAucHVzaChcIiNcIiArIGNvdW50ICsgdHhuICsgXCIgLSBcIiArIGkudG9vbHRpcF9zdGF0dXMgKyBwYWlkKVxuICAgICAgICBjb3VudCsrXG4gICAgICApXG4gICAgICByZXR1cm4gdG9vbHRpcC5qb2luKFwiPGJyIC8+XCIpXG5cblxuICAgICMgVE9ETzogUmVmYWN0b3Igb25jZSB3ZSBoYXZlIHVuZGVyc3Rvb2QgZXhhY3RseSBob3cgdGhlIGFuZ3VsYXJqcyBjb21waWxhdGlvbiBwcm9jZXNzIHdvcmtzOlxuICAgICMgaW4gdGhpcyBvcmRlciwgd2Ugc2hvdWxkOlxuICAgICMgMS0gY29tcGlsZSBpbXBhYy13aWRnZXQgY29udHJvbGxlclxuICAgICMgMi0gY29tcGlsZSB0aGUgc3BlY2lmaWMgd2lkZ2V0IHRlbXBsYXRlL2NvbnRyb2xsZXJcbiAgICAjIDMtIGNvbXBpbGUgdGhlIHNldHRpbmdzIHRlbXBsYXRlcy9jb250cm9sbGVyc1xuICAgICMgNC0gY2FsbCB3aWRnZXQubG9hZENvbnRlbnQoKSAoaWRlYWxseSwgZnJvbSBpbXBhYy13aWRnZXQsIG9uY2UgYSBjYWxsYmFjayBcbiAgICAjICAgICBhc3Nlc3NpbmcgdGhhdCBldmVyeXRoaW5nIGlzIGNvbXBpbGVkIGFuIHJlYWR5IGlzIHJlY2VpdmVkKVxuICAgIGdldFNldHRpbmdzQ291bnQgPSAtPlxuICAgICAgaWYgdy5zZXR0aW5ncz9cbiAgICAgICAgcmV0dXJuIHcuc2V0dGluZ3MubGVuZ3RoXG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAwXG5cbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA9PSAxXG5cbiAgICByZXR1cm4gd1xuXG5dKVxuXG5tb2R1bGUuZGlyZWN0aXZlKCd3aWRnZXRJbnZvaWNlc0xpc3QnLCAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50KSAtPlxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImludm9pY2VzXCIpXG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwibGlzdFwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0SW52b2ljZXNMaXN0Q3RybCdcbiAgfVxuKSJdfQ==