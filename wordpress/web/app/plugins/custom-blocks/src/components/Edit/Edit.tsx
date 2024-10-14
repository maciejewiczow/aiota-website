import {
    InnerBlocks,
    InspectorControls,
    useBlockProps,
} from '@wordpress/block-editor';
import { BlockAttribute, BlockEditProps } from '@wordpress/blocks';
import { PanelBody } from '@wordpress/components';
import cx from 'classnames';
import { capitalize, flow, lowerCase } from 'lodash';
import {
    BlockAttrsWithOptionalEditSave,
    EditorConfig,
    EditorFieldConfig,
    FieldType,
} from '../../types';
import { FieldForConfigEntry } from './FieldForConfigEntry';
import classes from './Edit.module.css';

const blockAttributeTypeToControlMap: Record<FieldType, EditorFieldConfig> = {
    string: {
        control: 'text',
        location: 'editor',
    },
    boolean: {
        control: 'toggle',
        location: 'editor',
    },
    number: {
        control: 'number',
        location: 'editor',
    },
    object: {
        control: 'textarea',
        initialLines: 10,
        location: 'editor',
    },
    array: {
        control: 'textarea',
        initialLines: 10,
        location: 'editor',
    },
};

const getDefaultLocationForControl = (
    controlType: EditorFieldConfig['control'],
): EditorFieldConfig['location'] => {
    switch (controlType) {
        case 'color':
            return 'inspector';
        default:
            return 'editor';
    }
};

const isRichText = (attribute: BlockAttribute<unknown>): boolean => typeof attribute !== 'string' &&
    attribute?.source === 'html' &&
    !!attribute?.selector;

export const Edit = (
    meta: BlockAttrsWithOptionalEditSave<Record<string, unknown>>,
    config?: EditorConfig<Record<string, unknown>>,
): React.FC<BlockEditProps<Record<string, unknown>>> => function CustomBlockEdit({ isSelected, attributes, setAttributes }) {
        // filter out config entries that are not present in the attributes object
        const localConfig = Object.fromEntries<EditorFieldConfig>(
            Object.entries<EditorFieldConfig>(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                config?.editorFields ?? ({} as any),
            )
                .filter(([key]) => Object.keys(meta.attributes).includes(key))
                .map(([key, entry]) => (entry?.location
                        ? [key, entry]
                        : [
                              key,
                              {
                                  ...entry,
                                  location: getDefaultLocationForControl(
                                      entry?.control ?? 'text',
                                  ),
                              },
                          ]),
                ),
        );

        // add default configs for things that are present in the attributes object
        // but do not have a corresponding entry in the config
        for (const [name, attr] of Object.entries(meta.attributes)) {
            if (!Object.keys(localConfig).includes(name)) {
                if (!isRichText(attr)) {
                    const type = typeof attr === 'string' ? attr : attr.type;

                    localConfig[name] = blockAttributeTypeToControlMap[type];
                } else {
                    localConfig[name] = {
                        control: 'richtext',
                    };
                }
            }

            if (!localConfig[name].label) {
                localConfig[name].label = flow(lowerCase, capitalize)(name);
            }
        }

        const blockProps = useBlockProps({
            className: cx(classes.controls, {
                [classes.controlsSelected]: isSelected,
            }),
        });

        return (
            <div {...blockProps}>
                <h3 className={classes.title}>
                    {config?.blockTitle?.(meta, attributes) ?? meta.title}
                </h3>
                <InspectorControls>
                    <PanelBody title="Block settings">
                        {Object.entries(localConfig)
                            .filter(
                                ([_, conf]) => conf.location === 'inspector',
                            )
                            .sort(
                                ([_, entryA], [__, entryB]) => (entryA.order ?? 0) - (entryB.order ?? 0),
                            )
                            .map(([attrName, configEntry]) => (
                                <FieldForConfigEntry
                                    className={classes.control}
                                    key={attrName}
                                    entry={configEntry}
                                    attribute={attributes[attrName]}
                                    // prettier-ignore
                                    setAttribute={(val: unknown) => setAttributes({ [attrName]: val })}
                                />
                            ))}
                    </PanelBody>
                </InspectorControls>
                <div>
                    {Object.entries(localConfig)
                        .filter(([_, conf]) => conf.location === 'editor')
                        .sort(
                            ([_, entryA], [__, entryB]) => (entryA.order ?? 0) - (entryB.order ?? 0),
                        )
                        .map(([attrName, configEntry]) => (
                            <FieldForConfigEntry
                                className={classes.control}
                                key={attrName}
                                entry={configEntry}
                                attribute={attributes[attrName]}
                                // prettier-ignore
                                setAttribute={(val: unknown) => setAttributes({ [attrName]: val })}
                            />
                        ))}
                </div>
                {(!meta.allowedBlocks || meta.allowedBlocks.length !== 0) && (
                    <>
                        <div className={classes.innerBlocksLabel}>Children</div>
                        <div className={classes.innerBlocksWrapper}>
                            <InnerBlocks
                                allowedBlocks={meta.allowedBlocks}
                                template={config?.template?.blocks}
                                templateLock={config?.template?.lock && 'all'}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    };
