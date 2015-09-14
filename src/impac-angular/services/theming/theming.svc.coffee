#=======================================
# provider for configuring impac-angular colour theme & layout.
#=======================================
angular
  .module('impac.services.theming', [])
  .provider('ImpacTheming', () ->

    provider = @
    #=======================================
    # Private Defaults
    #=======================================
    options =
      # TODO::ImpacTheming: rework chartColors to using color naming conventions /
      # angular material influenced structure.
      chartColors:
        positive: '#3FC4FF',
        negative: '#1DE9B6',
        array: [
          "#1de9b6",
          "#7c4dff",
          "#ffc928",
          "#3fc4ff",
          "#ff8e01",
          "#c6ff00",
          "#d500fa",
          "#ff6e41",
          "#ffeb3c",
          "#ff1844"
        ]
      dhbControls:
        dhbSelectorType: 'dropdown'
    #=======================================
    # Public methods available in config
    #=======================================
    provider.configureChartTheme = (configOptions) ->
      angular.extend(options.chartColors, configOptions)

    provider.configureDhbControls = (configOptions) ->
      angular.extend(options.dhbControls, configOptions)

    #=======================================
    # TODO: does ng-annotate annotate provider $get methods in the gulp build process?
    _$get = () ->
      service = @
      #=======================================
      # Public methods available as service
      #=======================================
      service.getChartColors = ->
        return options.chartColors

      service.getDhbSelectorType = ->
        return options.dhbControls.dhbSelectorType

      return service
    # inject service dependencies here, and declare in _$get function args.
    _$get.$inject = [];
    # attach provider function onto the provider object
    provider.$get = _$get

    return provider
  )
