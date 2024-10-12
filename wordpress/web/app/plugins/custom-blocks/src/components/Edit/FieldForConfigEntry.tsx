import { RichText } from '@wordpress/block-editor';
import {
    __experimentalNumberControl as NumberControl,
    ColorPicker,
    RadioControl,
    RangeControl,
    SelectControl,
    TextareaControl,
    TextControl,
    ToggleControl,
} from '@wordpress/components';
import { EditorFieldConfig } from '../../types';
import { InternalLinkSelect } from '../controls/InternalLinkSelect';
import classes from './Edit.module.css';

interface FieldForConfigEntryProps {
    entry: EditorFieldConfig;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attribute: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setAttribute: (value: any) => void;
    className?: string;
}

export const FieldForConfigEntry: React.FC<FieldForConfigEntryProps> = ({
    entry,
    attribute,
    setAttribute,
    className,
}) => {
    if (entry.hidden) {
        return null;
    }

    switch (entry.control) {
        case 'color':
            return (
                <label>
                    <h4 className={classes.controlLabelText}>{entry.label}</h4>
                    {entry.description && <span>{entry.description}</span>}
                    <ColorPicker
                        color={attribute}
                        onChange={setAttribute}
                        defaultValue={entry.defaultValue}
                        className={className}
                    />
                </label>
            );
        case 'toggle':
            return (
                <ToggleControl
                    label={entry.label}
                    checked={!!attribute}
                    onChange={setAttribute}
                    defaultChecked={entry.defaultValue}
                    className={className}
                    help={entry.description}
                />
            );
        case 'number':
            return (
                <NumberControl
                    value={+attribute}
                    label={entry.label}
                    onChange={setAttribute}
                    step={entry.step}
                    min={entry.min}
                    max={entry.max}
                    defaultValue={entry.defaultValue}
                    className={className}
                />
            );
        case 'range':
            return (
                <RangeControl
                    value={attribute}
                    onChange={setAttribute}
                    label={entry.label}
                    min={entry.min}
                    max={entry.max}
                    step={entry.step}
                    help={entry.description}
                    defaultValue={entry.defaultValue}
                    className={className}
                />
            );
        case 'radio':
            return (
                <RadioControl
                    selected={attribute}
                    onChange={setAttribute}
                    options={entry.options}
                    label={entry.label}
                    help={entry.description}
                    defaultValue={entry.defaultValue}
                    className={className}
                />
            );
        case 'select':
            return (
                <SelectControl
                    value={attribute}
                    onChange={setAttribute}
                    options={entry.options}
                    label={entry.label}
                    help={entry.description}
                    defaultValue={entry.defaultValue}
                    className={className}
                />
            );
        case 'text':
            return (
                <TextControl
                    value={attribute}
                    onChange={setAttribute}
                    label={entry.label}
                    help={entry.description}
                    defaultValue={entry.defaultValue}
                    className={className}
                />
            );
        case 'textarea':
            return (
                <TextareaControl
                    value={attribute}
                    onChange={setAttribute}
                    label={entry.label}
                    help={entry.description}
                    rows={entry.initialLines}
                    defaultValue={entry.defaultValue}
                    className={className}
                />
            );
        case 'richtext':
            return (
                <RichText
                    value={attribute}
                    onChange={setAttribute}
                    label={entry.label}
                    className={className}
                />
            );
        case 'internal-link':
            return (
                <InternalLinkSelect
                    value={attribute}
                    onChange={setAttribute}
                    label={entry.label}
                    description={entry.description}
                />
            );
        case 'url':
            return (
                <TextControl
                    type="url"
                    value={attribute}
                    onChange={setAttribute}
                    label={entry.label}
                    help={entry.description}
                    className={className}
                />
            );
        default:
            assertUnreachable(entry);
    }
};

function assertUnreachable(_: never) {
    throw new Error('This code should be unreachable!');
}
