(function () {
var module;

module = angular.module('maestrano.analytics.widget-accounts-balance-sheet', ['maestrano.assets']);

module.controller('WidgetAccountsBalanceSheetCtrl', [
  '$scope', 'DhbAnalyticsSvc', 'ChartFormatterSvc', function($scope, DhbAnalyticsSvc, ChartFormatterSvc) {
    var getSettingsCount, unCollapsedSetting, w;
    w = $scope.widget;
    w.initContext = function() {
      if ($scope.isDataFound = angular.isDefined(w.content) && !_.isEmpty(w.content.summary) && !_.isEmpty(w.content.dates)) {
        $scope.periodOptions = [
          {
            label: "Year",
            value: "YEARLY"
          }, {
            label: "Quarter",
            value: "QUARTERLY"
          }, {
            label: "Month",
            value: "MONTHLY"
          }, {
            label: "Week",
            value: "WEEKLY"
          }, {
            label: "Day",
            value: "DAILY"
          }
        ];
        $scope.period = _.find($scope.periodOptions, function(o) {
          return o.value === w.content.period;
        }) || $scope.periodOptions[2];
        $scope.dates = w.content.dates;
        $scope.unCollapsed = w.metadata.unCollapsed || [];
        return $scope.categories = Object.keys(w.content.summary);
      }
    };
    $scope.toogleCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          $scope.unCollapsed = _.reject($scope.unCollapsed, function(name) {
            return name === categoryName;
          });
        } else {
          $scope.unCollapsed.push(categoryName);
        }
        return w.updateSettings(false);
      }
    };
    $scope.isCollapsed = function(categoryName) {
      if (categoryName != null) {
        if (_.find($scope.unCollapsed, (function(name) {
          return categoryName === name;
        }))) {
          return false;
        } else {
          return true;
        }
      }
    };
    unCollapsedSetting = {};
    unCollapsedSetting.initialized = false;
    unCollapsedSetting.initialize = function() {
      return unCollapsedSetting.initialized = true;
    };
    unCollapsedSetting.toMetadata = function() {
      return {
        unCollapsed: $scope.unCollapsed
      };
    };
    w.settings.push(unCollapsedSetting);
    getSettingsCount = function() {
      if (w.settings != null) {
        return w.settings.length;
      } else {
        return 0;
      }
    };
    $scope.$watch(getSettingsCount, function(total) {
      if (total >= 3) {
        return w.loadContent();
      }
    });
    return w;
  }
]);

module.directive('widgetAccountsBalanceSheet', function() {
  return {
    restrict: 'A',
    link: function(scope, element) {
      element.addClass("accounts");
      return element.addClass("balance-sheet");
    },
    controller: 'WidgetAccountsBalanceSheetCtrl'
  };
});
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndpZGdldHMvd2lkZ2V0LWFjY291bnRzLWJhbGFuY2Utc2hlZXQuanMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUE7O0FBQUEsTUFBQSxHQUFTLE9BQU8sQ0FBQyxNQUFSLENBQWUsbURBQWYsRUFBbUUsQ0FBQyxrQkFBRCxDQUFuRTs7QUFFVCxNQUFNLENBQUMsVUFBUCxDQUFrQixnQ0FBbEIsRUFBbUQ7RUFDakQsUUFEaUQsRUFDdkMsaUJBRHVDLEVBQ3BCLG1CQURvQixFQUVqRCxTQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGlCQUExQjtBQUVFLFFBQUE7SUFBQSxDQUFBLEdBQUksTUFBTSxDQUFDO0lBRVgsQ0FBQyxDQUFDLFdBQUYsR0FBZ0IsU0FBQTtNQUNkLElBQUcsTUFBTSxDQUFDLFdBQVAsR0FBcUIsT0FBTyxDQUFDLFNBQVIsQ0FBa0IsQ0FBQyxDQUFDLE9BQXBCLENBQUEsSUFBZ0MsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBcEIsQ0FBakMsSUFBaUUsQ0FBQyxDQUFDLENBQUMsT0FBRixDQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBcEIsQ0FBMUY7UUFFRSxNQUFNLENBQUMsYUFBUCxHQUF1QjtVQUNyQjtZQUFDLEtBQUEsRUFBTyxNQUFSO1lBQWdCLEtBQUEsRUFBTyxRQUF2QjtXQURxQixFQUVyQjtZQUFDLEtBQUEsRUFBTyxTQUFSO1lBQW1CLEtBQUEsRUFBTyxXQUExQjtXQUZxQixFQUdyQjtZQUFDLEtBQUEsRUFBTyxPQUFSO1lBQWlCLEtBQUEsRUFBTyxTQUF4QjtXQUhxQixFQUlyQjtZQUFDLEtBQUEsRUFBTyxNQUFSO1lBQWdCLEtBQUEsRUFBTyxRQUF2QjtXQUpxQixFQUtyQjtZQUFDLEtBQUEsRUFBTyxLQUFSO1lBQWUsS0FBQSxFQUFPLE9BQXRCO1dBTHFCOztRQU92QixNQUFNLENBQUMsTUFBUCxHQUFnQixDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxhQUFkLEVBQTZCLFNBQUMsQ0FBRDtpQkFDM0MsQ0FBQyxDQUFDLEtBQUYsS0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBRHNCLENBQTdCLENBQUEsSUFFWCxNQUFNLENBQUMsYUFBYyxDQUFBLENBQUE7UUFFMUIsTUFBTSxDQUFDLEtBQVAsR0FBZSxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBWCxJQUEwQjtlQUMvQyxNQUFNLENBQUMsVUFBUCxHQUFvQixNQUFNLENBQUMsSUFBUCxDQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBdEIsRUFmdEI7O0lBRGM7SUFrQmhCLE1BQU0sQ0FBQyxlQUFQLEdBQXlCLFNBQUMsWUFBRDtNQUN2QixJQUFHLG9CQUFIO1FBQ0UsSUFBRyxDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxXQUFkLEVBQTJCLENBQUMsU0FBQyxJQUFEO2lCQUFVLFlBQUEsS0FBZ0I7UUFBMUIsQ0FBRCxDQUEzQixDQUFIO1VBQ0UsTUFBTSxDQUFDLFdBQVAsR0FBcUIsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxNQUFNLENBQUMsV0FBaEIsRUFBNkIsU0FBQyxJQUFEO21CQUNoRCxJQUFBLEtBQVE7VUFEd0MsQ0FBN0IsRUFEdkI7U0FBQSxNQUFBO1VBS0UsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFuQixDQUF3QixZQUF4QixFQUxGOztlQU1BLENBQUMsQ0FBQyxjQUFGLENBQWlCLEtBQWpCLEVBUEY7O0lBRHVCO0lBVXpCLE1BQU0sQ0FBQyxXQUFQLEdBQXFCLFNBQUMsWUFBRDtNQUNuQixJQUFHLG9CQUFIO1FBQ0UsSUFBRyxDQUFDLENBQUMsSUFBRixDQUFPLE1BQU0sQ0FBQyxXQUFkLEVBQTJCLENBQUMsU0FBQyxJQUFEO2lCQUFVLFlBQUEsS0FBZ0I7UUFBMUIsQ0FBRCxDQUEzQixDQUFIO0FBQ0UsaUJBQU8sTUFEVDtTQUFBLE1BQUE7QUFHRSxpQkFBTyxLQUhUO1NBREY7O0lBRG1CO0lBVXJCLGtCQUFBLEdBQXFCO0lBQ3JCLGtCQUFrQixDQUFDLFdBQW5CLEdBQWlDO0lBRWpDLGtCQUFrQixDQUFDLFVBQW5CLEdBQWdDLFNBQUE7YUFDOUIsa0JBQWtCLENBQUMsV0FBbkIsR0FBaUM7SUFESDtJQUdoQyxrQkFBa0IsQ0FBQyxVQUFuQixHQUFnQyxTQUFBO2FBQzlCO1FBQUMsV0FBQSxFQUFhLE1BQU0sQ0FBQyxXQUFyQjs7SUFEOEI7SUFHaEMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFYLENBQWdCLGtCQUFoQjtJQVdBLGdCQUFBLEdBQW1CLFNBQUE7TUFDakIsSUFBRyxrQkFBSDtBQUNFLGVBQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxPQURwQjtPQUFBLE1BQUE7QUFHRSxlQUFPLEVBSFQ7O0lBRGlCO0lBT25CLE1BQU0sQ0FBQyxNQUFQLENBQWMsZ0JBQWQsRUFBZ0MsU0FBQyxLQUFEO01BQzlCLElBQW1CLEtBQUEsSUFBUyxDQUE1QjtlQUFBLENBQUMsQ0FBQyxXQUFGLENBQUEsRUFBQTs7SUFEOEIsQ0FBaEM7QUFHQSxXQUFPO0VBeEVULENBRmlEO0NBQW5EOztBQTZFQSxNQUFNLENBQUMsU0FBUCxDQUFpQiw0QkFBakIsRUFBK0MsU0FBQTtBQUM3QyxTQUFPO0lBQ0wsUUFBQSxFQUFVLEdBREw7SUFFTCxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUjtNQUNKLE9BQU8sQ0FBQyxRQUFSLENBQWlCLFVBQWpCO2FBQ0EsT0FBTyxDQUFDLFFBQVIsQ0FBaUIsZUFBakI7SUFGSSxDQUZEO0lBS0osVUFBQSxFQUFZLGdDQUxSOztBQURzQyxDQUEvQyIsImZpbGUiOiJ3aWRnZXRzL3dpZGdldC1hY2NvdW50cy1iYWxhbmNlLXNoZWV0LmpzLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ21hZXN0cmFuby5hbmFseXRpY3Mud2lkZ2V0LWFjY291bnRzLWJhbGFuY2Utc2hlZXQnLFsnbWFlc3RyYW5vLmFzc2V0cyddKVxuXG5tb2R1bGUuY29udHJvbGxlcignV2lkZ2V0QWNjb3VudHNCYWxhbmNlU2hlZXRDdHJsJyxbXG4gICckc2NvcGUnLCAnRGhiQW5hbHl0aWNzU3ZjJywgJ0NoYXJ0Rm9ybWF0dGVyU3ZjJyxcbiAgKCRzY29wZSwgRGhiQW5hbHl0aWNzU3ZjLCBDaGFydEZvcm1hdHRlclN2YykgLT5cblxuICAgIHcgPSAkc2NvcGUud2lkZ2V0XG5cbiAgICB3LmluaXRDb250ZXh0ID0gLT5cbiAgICAgIGlmICRzY29wZS5pc0RhdGFGb3VuZCA9IGFuZ3VsYXIuaXNEZWZpbmVkKHcuY29udGVudCkgJiYgIV8uaXNFbXB0eSh3LmNvbnRlbnQuc3VtbWFyeSkgJiYgIV8uaXNFbXB0eSh3LmNvbnRlbnQuZGF0ZXMpXG5cbiAgICAgICAgJHNjb3BlLnBlcmlvZE9wdGlvbnMgPSBbXG4gICAgICAgICAge2xhYmVsOiBcIlllYXJcIiwgdmFsdWU6IFwiWUVBUkxZXCJ9LFxuICAgICAgICAgIHtsYWJlbDogXCJRdWFydGVyXCIsIHZhbHVlOiBcIlFVQVJURVJMWVwifSxcbiAgICAgICAgICB7bGFiZWw6IFwiTW9udGhcIiwgdmFsdWU6IFwiTU9OVEhMWVwifSxcbiAgICAgICAgICB7bGFiZWw6IFwiV2Vla1wiLCB2YWx1ZTogXCJXRUVLTFlcIn0sXG4gICAgICAgICAge2xhYmVsOiBcIkRheVwiLCB2YWx1ZTogXCJEQUlMWVwifSxcbiAgICAgICAgXVxuICAgICAgICAkc2NvcGUucGVyaW9kID0gXy5maW5kKCRzY29wZS5wZXJpb2RPcHRpb25zLCAobykgLT5cbiAgICAgICAgICBvLnZhbHVlID09IHcuY29udGVudC5wZXJpb2RcbiAgICAgICAgKSB8fCAkc2NvcGUucGVyaW9kT3B0aW9uc1syXVxuXG4gICAgICAgICRzY29wZS5kYXRlcyA9IHcuY29udGVudC5kYXRlc1xuICAgICAgICAkc2NvcGUudW5Db2xsYXBzZWQgPSB3Lm1ldGFkYXRhLnVuQ29sbGFwc2VkIHx8IFtdXG4gICAgICAgICRzY29wZS5jYXRlZ29yaWVzID0gT2JqZWN0LmtleXMody5jb250ZW50LnN1bW1hcnkpXG5cbiAgICAkc2NvcGUudG9vZ2xlQ29sbGFwc2VkID0gKGNhdGVnb3J5TmFtZSkgLT5cbiAgICAgIGlmIGNhdGVnb3J5TmFtZT8gXG4gICAgICAgIGlmIF8uZmluZCgkc2NvcGUudW5Db2xsYXBzZWQsICgobmFtZSkgLT4gY2F0ZWdvcnlOYW1lID09IG5hbWUpKVxuICAgICAgICAgICRzY29wZS51bkNvbGxhcHNlZCA9IF8ucmVqZWN0KCRzY29wZS51bkNvbGxhcHNlZCwgKG5hbWUpIC0+XG4gICAgICAgICAgICBuYW1lID09IGNhdGVnb3J5TmFtZVxuICAgICAgICAgIClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICRzY29wZS51bkNvbGxhcHNlZC5wdXNoKGNhdGVnb3J5TmFtZSlcbiAgICAgICAgdy51cGRhdGVTZXR0aW5ncyhmYWxzZSlcblxuICAgICRzY29wZS5pc0NvbGxhcHNlZCA9IChjYXRlZ29yeU5hbWUpIC0+XG4gICAgICBpZiBjYXRlZ29yeU5hbWU/ICBcbiAgICAgICAgaWYgXy5maW5kKCRzY29wZS51bkNvbGxhcHNlZCwgKChuYW1lKSAtPiBjYXRlZ29yeU5hbWUgPT0gbmFtZSkpXG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXR1cm4gdHJ1ZVxuXG5cbiAgICAjICMjIyBNaW5pLXNldHRpbmdzXG5cbiAgICB1bkNvbGxhcHNlZFNldHRpbmcgPSB7fVxuICAgIHVuQ29sbGFwc2VkU2V0dGluZy5pbml0aWFsaXplZCA9IGZhbHNlXG4gICAgXG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nLmluaXRpYWxpemUgPSAtPlxuICAgICAgdW5Db2xsYXBzZWRTZXR0aW5nLmluaXRpYWxpemVkID0gdHJ1ZVxuXG4gICAgdW5Db2xsYXBzZWRTZXR0aW5nLnRvTWV0YWRhdGEgPSAtPlxuICAgICAge3VuQ29sbGFwc2VkOiAkc2NvcGUudW5Db2xsYXBzZWR9XG5cbiAgICB3LnNldHRpbmdzLnB1c2godW5Db2xsYXBzZWRTZXR0aW5nKVxuXG4gICAgIyAtLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgIyBUT0RPOiBSZWZhY3RvciBvbmNlIHdlIGhhdmUgdW5kZXJzdG9vZCBleGFjdGx5IGhvdyB0aGUgYW5ndWxhcmpzIGNvbXBpbGF0aW9uIHByb2Nlc3Mgd29ya3M6XG4gICAgIyBpbiB0aGlzIG9yZGVyLCB3ZSBzaG91bGQ6XG4gICAgIyAxLSBjb21waWxlIGltcGFjLXdpZGdldCBjb250cm9sbGVyXG4gICAgIyAyLSBjb21waWxlIHRoZSBzcGVjaWZpYyB3aWRnZXQgdGVtcGxhdGUvY29udHJvbGxlclxuICAgICMgMy0gY29tcGlsZSB0aGUgc2V0dGluZ3MgdGVtcGxhdGVzL2NvbnRyb2xsZXJzXG4gICAgIyA0LSBjYWxsIHdpZGdldC5sb2FkQ29udGVudCgpIChpZGVhbGx5LCBmcm9tIGltcGFjLXdpZGdldCwgb25jZSBhIGNhbGxiYWNrIFxuICAgICMgICAgIGFzc2Vzc2luZyB0aGF0IGV2ZXJ5dGhpbmcgaXMgY29tcGlsZWQgYW4gcmVhZHkgaXMgcmVjZWl2ZWQpXG4gICAgZ2V0U2V0dGluZ3NDb3VudCA9IC0+XG4gICAgICBpZiB3LnNldHRpbmdzP1xuICAgICAgICByZXR1cm4gdy5zZXR0aW5ncy5sZW5ndGhcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIDBcblxuICAgICMgb3JnYW5pemF0aW9uX2lkcyArIHVuQ29sbGFwc2VkICsgcGFyYW0gc2VsZWN0b3JcbiAgICAkc2NvcGUuJHdhdGNoIGdldFNldHRpbmdzQ291bnQsICh0b3RhbCkgLT5cbiAgICAgIHcubG9hZENvbnRlbnQoKSBpZiB0b3RhbCA+PSAzXG5cbiAgICByZXR1cm4gd1xuXSlcblxubW9kdWxlLmRpcmVjdGl2ZSgnd2lkZ2V0QWNjb3VudHNCYWxhbmNlU2hlZXQnLCAtPlxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50KSAtPlxuICAgICAgZWxlbWVudC5hZGRDbGFzcyhcImFjY291bnRzXCIpXG4gICAgICBlbGVtZW50LmFkZENsYXNzKFwiYmFsYW5jZS1zaGVldFwiKVxuICAgICxjb250cm9sbGVyOiAnV2lkZ2V0QWNjb3VudHNCYWxhbmNlU2hlZXRDdHJsJ1xuICB9XG4pIl19