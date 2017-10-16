#
# Component generated by Impac! Widget Generator!
#
module = angular.module('impac.components.widgets.legal-news-feed', [])
module.controller('WidgetLegalNewsFeedCtrl', ($scope, $q, $http, $timeout, ImpacAssets, ImpacWidgetsSvc) ->

  w = $scope.widget

  # Define settings
  # --------------------------------------
  $scope.orgDeferred = $q.defer()

  settingsPromises = [
    $scope.orgDeferred.promise
  ]

  $scope.loaderUrl = "#{ImpacAssets.get('defaultImagesPath')}/double-ring-loader.gif"
  $scope.rssId = "rss-feeds-#{w.id}"

  $scope.keywords = {
    tags: []
    init: ->
      this.tags = w.metadata.keywords || _.map(['affaire', 'justice', 'jugement', 'loi'], (t) -> { text: t })
    format: ->
      return '' unless this.tags
      tags = _.map this.tags, (t) -> t.text
      tags.join('%20')
  }

  $scope.sources =
    list: [
      { value: 'google', label: 'Google News', url: 'https://news.google.com/news/rss/headlines/section/q' },
      { value: 'village-justice', label: 'Village justice', url: 'https://www.village-justice.com/articles/spip.php?page=backend' },
      { value: 'legavox', label: 'Legavox', url: 'http://www.legavox.fr/rss/article/flux-article-juridique.xml' },
      { value: 'editions-legislatives', label: 'Editions legislatives', url: 'http://www.editions-legislatives.fr/rss/rss05.xml' }
      { value: 'assemblee-nationale', label: 'Assemblee nationale', url: 'http://www2.assemblee-nationale.fr/feeds/detail/documents-parlementaires' }
    ]
    init: ->
      this.selected = w.metadata.source || 'google'

  buildUrl = ->
    url = _.find($scope.sources.list, (s) -> s.value == $scope.sources.selected).url
    if $scope.sources.selected == 'google'
      "#{url}/#{$scope.keywords.format()}/Legal?ned=fr&hl=fr"
    else
      url

  loadRss = ->
    $scope.loading = true

    rssElem = $("##{$scope.rssId}")
    rssElem.empty()

    rssUrl = buildUrl()
    rssElem.rss(
      rssUrl,
      {
        limit: 10
        dateFormat: 'DD/MM/YYYY'
        ssl: true
        entryTemplate: '
          <div class="row entry">
            <div class="col-xs-4 text-center">
              {teaserImage}
            </div>
            <div class="col-xs-8">
              <a href="{url}">{date} - {title}</a>
              <br/>
              {shortBodyPlain}
            </div>
          </div>
        '
      },
      -> $timeout(-> $scope.loading = false)
    )

  $scope.reload = ->
    loadRss()
    meta =
      keywords: $scope.keywords.tags
      source: $scope.sources.selected
    ImpacWidgetsSvc.update(w, metadata: meta, false)

  # Widget specific methods
  # --------------------------------------
  w.initContext = ->
    $scope.keywords.init()
    $scope.sources.init()
    loadRss()
    $scope.isDataFound = true

  # Widget is ready: can trigger the "wait for settings to be ready"
  # --------------------------------------
  $scope.widgetDeferred.resolve(settingsPromises)
)

module.directive('widgetLegalNewsFeed', ->
  return {
    restrict: 'A',
    controller: 'WidgetLegalNewsFeedCtrl'
  }
)
