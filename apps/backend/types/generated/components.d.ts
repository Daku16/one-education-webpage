import type { Schema, Struct } from '@strapi/strapi';

export interface ResourceActivity extends Struct.ComponentSchema {
  collectionName: 'components_resource_activities';
  info: {
    displayName: 'activity';
  };
  attributes: {
    activity_type: Schema.Attribute.Enumeration<
      ['juego', 'dinamica', 'reto', 'historia', 'ejercicio']
    >;
    expected_outcome: Schema.Attribute.Blocks;
    instructions: Schema.Attribute.Blocks;
    materials: Schema.Attribute.Component<'shared.list-item', true>;
    objective: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface ResourceCallout extends Struct.ComponentSchema {
  collectionName: 'components_resource_callouts';
  info: {
    displayName: 'callout';
  };
  attributes: {
    icon_name: Schema.Attribute.String;
    text: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
    variant: Schema.Attribute.Enumeration<
      ['info', 'success', 'warning', 'neutral']
    >;
  };
}

export interface ResourceKeyPoints extends Struct.ComponentSchema {
  collectionName: 'components_resource_key_points';
  info: {
    displayName: 'key-points';
  };
  attributes: {
    intro: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ResourceLinks extends Struct.ComponentSchema {
  collectionName: 'components_resource_links';
  info: {
    displayName: 'links';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'shared.link-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ResourceMaterialItem extends Struct.ComponentSchema {
  collectionName: 'components_resource_material_items';
  info: {
    displayName: 'material-item';
  };
  attributes: {
    description: Schema.Attribute.String;
    external_url: Schema.Attribute.String;
    file: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    name: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['infografia', 'video', 'presentacion', 'guia', 'pdf', 'otro']
    >;
  };
}

export interface ResourceMaterialList extends Struct.ComponentSchema {
  collectionName: 'components_resource_material_lists';
  info: {
    displayName: 'material-list';
  };
  attributes: {
    description: Schema.Attribute.String;
    materials: Schema.Attribute.Component<'resource.material-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface ResourceMediaBlock extends Struct.ComponentSchema {
  collectionName: 'components_resource_media_blocks';
  info: {
    displayName: 'media-block';
  };
  attributes: {
    caption: Schema.Attribute.String;
    layout: Schema.Attribute.Enumeration<
      ['full', 'contained', 'left', 'right']
    >;
    media: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    title: Schema.Attribute.String;
  };
}

export interface ResourcePhaseItem extends Struct.ComponentSchema {
  collectionName: 'components_resource_phase_items';
  info: {
    displayName: 'phase-item';
  };
  attributes: {
    development: Schema.Attribute.Blocks;
    expected_results: Schema.Attribute.Blocks;
    main_resource: Schema.Attribute.Text;
    objective: Schema.Attribute.Blocks;
    phase_number: Schema.Attribute.Integer;
    title: Schema.Attribute.String;
  };
}

export interface ResourcePhaseList extends Struct.ComponentSchema {
  collectionName: 'components_resource_phase_lists';
  info: {
    displayName: 'phase-list';
  };
  attributes: {
    intro: Schema.Attribute.String;
    phases: Schema.Attribute.Component<'resource.phase-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedLinkItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_link_items';
  info: {
    displayName: 'link-item';
  };
  attributes: {
    label: Schema.Attribute.String;
    type: Schema.Attribute.Enumeration<
      ['pdf', 'video', 'presentacion', 'sitio', 'descarga', 'otro']
    >;
    url: Schema.Attribute.String;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    displayName: 'list-item';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    displayName: 'rich-text';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    text: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'resource.activity': ResourceActivity;
      'resource.callout': ResourceCallout;
      'resource.key-points': ResourceKeyPoints;
      'resource.links': ResourceLinks;
      'resource.material-item': ResourceMaterialItem;
      'resource.material-list': ResourceMaterialList;
      'resource.media-block': ResourceMediaBlock;
      'resource.phase-item': ResourcePhaseItem;
      'resource.phase-list': ResourcePhaseList;
      'shared.link-item': SharedLinkItem;
      'shared.list-item': SharedListItem;
      'shared.rich-text': SharedRichText;
    }
  }
}
