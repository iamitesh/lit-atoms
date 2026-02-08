/**
 * Component manifest for generating framework wrappers
 * This file contains metadata about all Lit components including their tag names,
 * class names, and events they dispatch.
 */

export interface ComponentManifest {
  tagName: string;
  className: string;
  events: string[];
  formControl?: boolean; // For Angular CVA
}

export const componentsManifest: ComponentManifest[] = [
  {
    tagName: 'lit-button',
    className: 'LitButton',
    events: ['button-click'],
  },
  {
    tagName: 'lit-input-field',
    className: 'LitInputField',
    events: ['input-change'],
    formControl: true,
  },
  {
    tagName: 'lit-checkbox',
    className: 'LitCheckbox',
    events: ['checkbox-change'],
    formControl: true,
  },
  {
    tagName: 'lit-radio',
    className: 'LitRadio',
    events: ['radio-change'],
    formControl: true,
  },
  {
    tagName: 'lit-textarea',
    className: 'LitTextarea',
    events: ['textarea-change'],
    formControl: true,
  },
  {
    tagName: 'lit-toggle',
    className: 'LitToggle',
    events: ['toggle-change'],
    formControl: true,
  },
  {
    tagName: 'lit-badge',
    className: 'LitBadge',
    events: [],
  },
  {
    tagName: 'lit-banner',
    className: 'LitBanner',
    events: ['banner-dismiss'],
  },
  {
    tagName: 'lit-card',
    className: 'LitCard',
    events: [],
  },
  {
    tagName: 'lit-dropdown',
    className: 'LitDropdown',
    events: ['dropdown-change'],
  },
  {
    tagName: 'lit-tooltip',
    className: 'LitTooltip',
    events: [],
  },
  {
    tagName: 'lit-spinner',
    className: 'LitSpinner',
    events: [],
  },
  {
    tagName: 'lit-progress-bar',
    className: 'LitProgressBar',
    events: [],
  },
  {
    tagName: 'lit-divider',
    className: 'LitDivider',
    events: [],
  },
  {
    tagName: 'lit-chip',
    className: 'LitChip',
    events: ['chip-click', 'chip-remove'],
  },
  {
    tagName: 'lit-header',
    className: 'LitHeader',
    events: ['header-click'],
  },
  {
    tagName: 'lit-footer',
    className: 'LitFooter',
    events: [],
  },
  {
    tagName: 'lit-navigation',
    className: 'LitNavigation',
    events: ['nav-click'],
  },
  {
    tagName: 'lit-accordion',
    className: 'LitAccordion',
    events: ['accordion-toggle'],
  },
  {
    tagName: 'lit-table',
    className: 'LitTable',
    events: [],
  },
  {
    tagName: 'lit-table-header',
    className: 'LitTableHeader',
    events: [],
  },
  {
    tagName: 'lit-table-body',
    className: 'LitTableBody',
    events: [],
  },
  {
    tagName: 'lit-table-row',
    className: 'LitTableRow',
    events: ['row-click'],
  },
  {
    tagName: 'lit-table-header-cell',
    className: 'LitTableHeaderCell',
    events: [],
  },
  {
    tagName: 'lit-table-cell',
    className: 'LitTableCell',
    events: [],
  },
  {
    tagName: 'lit-modal',
    className: 'LitModal',
    events: ['modal-close'],
  },
  {
    tagName: 'lit-alert',
    className: 'LitAlert',
    events: ['alert-dismiss'],
  },
  {
    tagName: 'lit-breadcrumb',
    className: 'LitBreadcrumb',
    events: ['breadcrumb-click'],
  },
  {
    tagName: 'lit-pagination',
    className: 'LitPagination',
    events: ['page-change'],
  },
  {
    tagName: 'lit-tabs',
    className: 'LitTabs',
    events: ['tab-change'],
  },
  {
    tagName: 'lit-sidebar',
    className: 'LitSidebar',
    events: [],
  },
  {
    tagName: 'lit-avatar',
    className: 'LitAvatar',
    events: [],
  },
  {
    tagName: 'lit-menu',
    className: 'LitMenu',
    events: ['menu-select'],
  },
  {
    tagName: 'lit-form',
    className: 'LitForm',
    events: ['form-submit'],
  },
  {
    tagName: 'lit-link',
    className: 'LitLink',
    events: ['link-click'],
  },
  {
    tagName: 'lit-list',
    className: 'LitList',
    events: ['list-item-click'],
  },
];
