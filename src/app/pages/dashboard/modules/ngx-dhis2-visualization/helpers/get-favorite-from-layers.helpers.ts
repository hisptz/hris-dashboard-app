import * as _ from 'lodash';
import { VisualizationLayer, VisualizationDataSelection } from '../models';
import { getStandardizedVisualizationType } from './get-standardized-visualization-type.helper';
import { updateDataSelectionBasedOnPreferences } from './update-data-selection-based-preference.helper';

export function getFavoriteFromLayers(
  visualizationLayers: VisualizationLayer[],
  originalType: string,
  currentType: string
) {
  if (visualizationLayers.length === 0) {
    return null;
  }

  // Get standardized visualization type
  const standardizedType = getStandardizedVisualizationType(originalType);

  switch (currentType) {
    case 'TABLE':
    case 'CHART': {
      // Get appropriate favorite type based on current selection
      const favoriteType =
        standardizedType === currentType
          ? originalType
          : currentType === 'CHART'
          ? 'CHART'
          : 'REPORT_TABLE';

      const favoriteArray = _.map(
        visualizationLayers,
        (visualizationLayer: VisualizationLayer) => {
          const groupedDataSelections = _.groupBy(
            visualizationLayer.dataSelections,
            'layout'
          );
          return {
            ...getFavoriteOptionsByType(
              visualizationLayer.config || {},
              currentType
            ),
            id: visualizationLayer.id,
            columns: getSanitizedDataSelections(
              groupedDataSelections['columns'],
              favoriteType
            ),
            rows: getSanitizedDataSelections(
              groupedDataSelections['rows'],
              favoriteType
            ),
            filters: getSanitizedDataSelections(
              groupedDataSelections['filters'],
              favoriteType
            )
          };
        }
      );

      return favoriteArray[0]
        ? {
            url: `${_.camelCase(favoriteType)}s`,
            hasDifferentType: standardizedType !== currentType,
            favoriteType,
            favorite: _.omit(favoriteArray[0], [
              'visualizationType',
              'spatialSupport'
            ])
          }
        : null;
    }
  }
}

export function getSanitizedDataSelections(
  dataSelections: VisualizationDataSelection[],
  favoriteType: string,
  favoritePreferences: any = {
    reportTable: { includeOrgUnitChildren: true },
    chart: { includeOrgUnitChildren: false }
  }
) {
  return _.map(dataSelections, dataSelection => {
    return _.omit(
      {
        ...updateDataSelectionBasedOnPreferences(
          dataSelection,
          favoriteType,
          favoritePreferences
        )
      },
      ['changed', 'layout']
    );
  });
}

function getFavoriteOptionsByType(favoriteDetails: any, favoriteType: string) {
  switch (favoriteType) {
    case 'CHART': {
      return {
        type: favoriteDetails.type || 'COLUMN',
        name: favoriteDetails.name || 'Bottleneck Analysis Chart',
        title: favoriteDetails.title || null,
        description: favoriteDetails.description || '',
        prototype: favoriteDetails.prototype || {},
        percentStackedValues: favoriteDetails.percentStackedValues || false,
        cumulativeValues: favoriteDetails.cumulativeValues || false,
        hideEmptyRowItems: favoriteDetails.hideEmptyRowItems || 'NONE',
        regressionType: favoriteDetails.regressionType || 'NONE',
        completedOnly: favoriteDetails.completedOnly || false,
        targetLineValue: favoriteDetails.targetLineValue || null,
        baseLineValue: favoriteDetails.baseLineValue || null,
        sortOrder: favoriteDetails.sortOrder || 0,
        aggregationType: favoriteDetails.aggregationType || 'DEFAULT',
        rangeAxisMaxValue: favoriteDetails.rangeAxisMaxValue || null,
        rangeAxisMinValue: favoriteDetails.rangeAxisMinValue || null,
        rangeAxisSteps: favoriteDetails.rangeAxisSteps || null,
        rangeAxisDecimals: favoriteDetails.rangeAxisDecimals || null,
        noSpaceBetweenColumns: favoriteDetails.noSpaceBetweenColumns || false,
        hideLegend: favoriteDetails.hideLegend || false,
        hideTitle: favoriteDetails.hideTitle || false,
        hideSubtitle: favoriteDetails.hideSubtitle || false,
        subtitle: favoriteDetails.subtitle || null,
        reportParams: favoriteDetails.reportParams || {},
        showData: favoriteDetails.showData || true,
        targetLineLabel: favoriteDetails.targetLineLabel || null,
        baseLineLabel: favoriteDetails.baseLineLabel || null,
        domainAxisLabel: favoriteDetails.domainAxisLabel || null,
        rangeAxisLabel: favoriteDetails.rangeAxisLabel || null
      };
    }
    case 'TABLE': {
      return {
        ...favoriteDetails,
        name: favoriteDetails.name || 'Bottleneck Sublevel Analysis',
        legendSet: favoriteDetails.legendSet
      };
    }
    default:
      return {};
  }
}
