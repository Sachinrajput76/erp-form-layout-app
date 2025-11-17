import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../redux/actions/Action';
import LoadOnScroll from '../../utils/LoadOnScroll';

const CommonHeader = ({
    title,
    path,
    formKey,
    fieldConfig = [],
    isDisabled = false,
    disabled = false,
    dropdownDataPath = 'addPurchaseOrder.0.initializeData',
    buttonsConfig = {},
    onFieldChange,
    classNames,
    containerGridClass,
    classesObj,
    splitForm = false,
}) => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.globalData.apiData);
    const reduxApiData = useSelector((state) => state.globalData.apiData);
    let formData = useSelector(
        (state) => state.globalData.formData?.[formKey]?.[path] || {}
    );
    if (!formData) formData = {};

    const {
        setIsMainButtonModalOpen,
        showMainButton = false,
        customButton = false,
        mainButtonLabel = 'Click for PRQ',
        buttons = [],
    } = buttonsConfig;

    const partyDetails = data?.gstAndPartyDetails?.[0]?.PartyDetails || {};
    const partyAddress = [
        partyDetails?.Address,
        partyDetails?.Address2,
        partyDetails?.Address3,
        partyDetails?.Address4,
        partyDetails?.City,
        partyDetails?.State,
        partyDetails?.Country,
    ]
        .filter(Boolean)
        .join(', ');

    const getValueFromPath = useCallback(
        (obj, path) => path?.split('.').reduce((acc, key) => acc?.[key], obj) ?? '',
        []
    );
    const getNestedData = (pathStr) =>
        pathStr?.split('.').reduce((acc, key) => acc?.[key], data) || [];

    const handleFieldChange = useCallback(
        async (fieldPath, rawValue, type = 'input', event = null) => {
            let value = rawValue;
            if (type === 'checkbox' && event) value = event.target.checked;
            if (type === 'date')
                value = value ? new Date(value).toISOString().split('T')[0] : '';
            if (type === 'dropdown') value = rawValue?.value ?? 0;
            dispatch(
                updateFormData(
                    formKey,
                    path != undefined ? `${path}.${fieldPath}` : fieldPath,
                    value
                )
            );

            if (onFieldChange) onFieldChange(`${fieldPath}`, value);
        },
        [dispatch, formKey, path, onFieldChange]
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return isNaN(d) ? '' : d.toISOString().split('T')[0];
    };

    //  Check if there’s any textarea field
    const hasSplitForm = splitForm;
    return (
        <fieldset disabled={disabled}>
            <section className={` ${classNames ? classNames : ''}`}>
                {title && (
                    <div className="heading">
                        <h2>{title}</h2>
                    </div>
                )}

                {/* If textarea exists → 50/50 layout */}
                {hasSplitForm ? (
                    <div
                        className={`sales-return-container ${containerGridClass ? containerGridClass : ''}`}
                    >
                        {/* Left side (50%) - all fields except textarea */}
                        <div className="sales-return-child-class ">
                            <div
                                className={`${!reduxApiData?.sidebarExtended ? `textarea-class-collapse ${classesObj?.textareaCollapseWrapper}` : 'textarea-class'} ${classesObj?.textareaWrapper}`}
                            >
                                {fieldConfig
                                    .filter((field) => field.type === 'textarea')
                                    .map((field, index) => {
                                        const textareaValue =
                                            getValueFromPath(formData, field.path) ||
                                            field.value ||
                                            partyAddress;

                                        return (
                                            <div
                                                key={index}
                                                className={`${hasSplitForm && ''} dropdown-${field.className || ''}`}
                                            >
                                                <div className="floating-label">
                                                    <textarea
                                                        className="floating-input textarea-height"
                                                        name={field.name}
                                                        id={field.id}
                                                        value={textareaValue}
                                                        rows={4}
                                                        cols={60}
                                                        placeholder=" "
                                                        disabled={isDisabled || field.disabled}
                                                        onChange={(e) =>
                                                            handleFieldChange(
                                                                field.path,
                                                                e.target.value,
                                                                field.inputType,
                                                                e
                                                            )
                                                        }
                                                    />
                                                    <label>{field.label}</label>
                                                </div>
                                            </div>
                                        );
                                    })}
                            </div>

                            <div className="">
                                {fieldConfig
                                    .filter((field) => field.type !== 'textarea')
                                    .map((field, index) => {
                                        const value =
                                            getValueFromPath(formData, field.path) ??
                                            field.value ??
                                            '';

                                        switch (field.type) {
                                            case 'dropdown': {
                                                const dropdownData =
                                                    field.options ||
                                                    getNestedData(
                                                        `${dropdownDataPath}.${field.optionsKey}`
                                                    );
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`${hasSplitForm && !reduxApiData?.sidebarExtended ? `input-field-collapse ${classesObj?.inputCollapse}` : 'input-field'} dropdown-${classesObj?.dropdown || 'md'} ${field?.fieldClass || ''}`}
                                                    >
                                                        <LoadOnScroll
                                                            id={field.id}
                                                            name={field.name}
                                                            opData={dropdownData}
                                                            placeholder={field.placeholder || field.name}
                                                            label={field.labelKey || 'label'}
                                                            saveText={field.valueKey || 'value'}
                                                            value={value || field.value || ''}
                                                            onChange={(selected) =>
                                                                handleFieldChange(
                                                                    field.path,
                                                                    selected?.value || 0
                                                                )
                                                            }
                                                            disabled={isDisabled || field.disabled}
                                                            requiredField={field.required}
                                                        />
                                                    </div>
                                                );
                                            }

                                            case 'input':
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`${hasSplitForm && !reduxApiData?.sidebarExtended ? `input-field-collapse ${classesObj?.inputCollapse}` : 'input-field'} dropdown-${classesObj?.input || 'md'} ${field?.fieldClass || ''}`}
                                                    >
                                                        <div className="floating-label">
                                                            <input
                                                                className={`floating-input ${field.className || ''}`}
                                                                type={
                                                                    field.inputType ? field.inputType : 'text'
                                                                }
                                                                id={field.id}
                                                                name={field.name}
                                                                placeholder=" "
                                                                value={
                                                                    field.inputType === 'date'
                                                                        ? formatDate(value || field.value)
                                                                        : value || field.value || ''
                                                                }
                                                                onChange={(e) =>
                                                                    handleFieldChange(
                                                                        field.path,
                                                                        e.target.value,
                                                                        field.inputType,
                                                                        e
                                                                    )
                                                                }
                                                                disabled={isDisabled || field.disabled}
                                                            />
                                                            <label>{field.label}</label>
                                                        </div>
                                                    </div>
                                                );

                                            case 'checkbox':
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`${hasSplitForm && !reduxApiData?.sidebarExtended ? `input-field-collapse ${classesObj?.inputCollapse}` : 'input-field'} dropdown-${classesObj?.checkbox || 'md'} ${field?.fieldClass || ''}`}
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input mx-2"
                                                            checked={!!value}
                                                            onChange={(e) =>
                                                                handleFieldChange(
                                                                    field.path,
                                                                    null,
                                                                    'checkbox',
                                                                    e
                                                                )
                                                            }
                                                            disabled={isDisabled || field.disabled}
                                                        />
                                                        <label
                                                            className="form-label"
                                                            htmlFor={field.id || field.name}
                                                        >
                                                            {field.label}
                                                        </label>
                                                    </div>
                                                );

                                            case 'radio':
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`checkbox-label-wrapper dropdown-${classesObj?.radio || 'md'}`}
                                                    >
                                                        <label>{field.label}</label>
                                                        {field.options?.map((option, idx) => (
                                                            <label key={idx}>
                                                                <input
                                                                    className="form-check-input mx-2"
                                                                    type="radio"
                                                                    name={field.name}
                                                                    value={option.value}
                                                                    checked={value === option.value}
                                                                    onChange={(e) =>
                                                                        handleFieldChange(
                                                                            field.path,
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    disabled={isDisabled || field.disabled}
                                                                />{' '}
                                                                {option.label}
                                                            </label>
                                                        ))}
                                                    </div>
                                                );

                                            case 'button':
                                                return (
                                                    <div
                                                        key={index}
                                                        className={`${hasSplitForm && !reduxApiData?.sidebarExtended ? `input-field-collapse ${classesObj?.inputCollapse}` : 'input-field'} dropdown-${classesObj?.button || 'md'}`}
                                                    >
                                                        <button
                                                            className={field.className}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (field.onClick) field.onClick(formData, e);
                                                            }}
                                                            disabled={isDisabled || field.disabled}
                                                        >
                                                            {field.label}
                                                        </button>
                                                    </div>
                                                );

                                            default:
                                                return null;
                                        }
                                    })}
                            </div>
                        </div>
                    </div>
                ) : (
                    // Default full-width layout
                    <div
                        className={`dropdown-container ${containerGridClass ? containerGridClass : ''}`}
                    >
                        {fieldConfig.map((field, index) => {
                            const value =
                                getValueFromPath(formData, field.path) ?? field.value ?? '';

                            switch (field.type) {
                                case 'dropdown': {
                                    const dropdownData =
                                        field.options ||
                                        getNestedData(`${dropdownDataPath}.${field.optionsKey}`);
                                    return (
                                        <div
                                            key={index}
                                            className={`${hasSplitForm && ''} dropdown-${classesObj?.dropdown || 'md'}`}
                                        >
                                            <LoadOnScroll
                                                id={field.id}
                                                name={field.name}
                                                opData={dropdownData}
                                                placeholder={field.placeholder || field.name}
                                                label={field.labelKey || 'label'}
                                                saveText={field.valueKey || 'value'}
                                                value={value || field.value || ''}
                                                onChange={(selected) =>
                                                    handleFieldChange(field.path, selected?.value || 0)
                                                }
                                                disabled={isDisabled || field.disabled}
                                                requiredField={field.required}
                                            />
                                        </div>
                                    );
                                }

                                case 'input':
                                    return (
                                        <div
                                            key={index}
                                            className={`${hasSplitForm && ''} dropdown-${classesObj?.input || 'md'}`}
                                        >
                                            <div className="floating-label">
                                                <input
                                                    className={`floating-input ${field.className || ''}`}
                                                    type={field.inputType ? field.inputType : 'text'}
                                                    id={field.id}
                                                    name={field.name}
                                                    placeholder=" "
                                                    value={
                                                        field.inputType === 'date'
                                                            ? formatDate(value || field.value)
                                                            : value || field.value || ''
                                                    }
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            field.path,
                                                            e.target.value,
                                                            field.inputType,
                                                            e
                                                        )
                                                    }
                                                    disabled={isDisabled || field.disabled}
                                                />
                                                <label>{field.label}</label>
                                            </div>
                                        </div>
                                    );

                                case 'checkbox':
                                    return (
                                        <div
                                            key={index}
                                            className={`checkbox-label-wrapper dropdown-${classesObj?.checkbox || 'md'}`}
                                        >
                                            <input
                                                type="checkbox"
                                                className="form-check-input mx-2"
                                                checked={!!value}
                                                onChange={(e) =>
                                                    handleFieldChange(field.path, null, 'checkbox', e)
                                                }
                                                disabled={isDisabled || field.disabled}
                                            />
                                            <label htmlFor={field.id || field.name}>
                                                {field.label}
                                            </label>
                                        </div>
                                    );

                                case 'radio':
                                    return (
                                        <div
                                            key={index}
                                            className={`checkbox-label-wrapper dropdown-${classesObj?.radio || 'md'}`}
                                        >
                                            <label>{field.label}</label>
                                            {field.options?.map((option, idx) => (
                                                <label key={idx} className="form-label">
                                                    <input
                                                        className="form-check-input mx-2"
                                                        type="radio"
                                                        name={field.name}
                                                        value={option.value}
                                                        checked={value === option.value}
                                                        disabled={isDisabled || field.disabled}
                                                        onChange={(e) =>
                                                            handleFieldChange(field.path, e.target.value)
                                                        }
                                                    />{' '}
                                                    {option.label}
                                                </label>
                                            ))}
                                        </div>
                                    );

                                case 'textarea': {
                                    const textareaValue = value || field.value || partyAddress;
                                    return (
                                        <div
                                            key={index}
                                            className={`${hasSplitForm && ''} dropdown-${classesObj?.textarea || 'md'}`}
                                        >
                                            <div className="floating-label">
                                                <textarea
                                                    className="floating-input"
                                                    name={field.name}
                                                    id={field.id}
                                                    value={textareaValue}
                                                    rows={4}
                                                    cols={60}
                                                    placeholder=" "
                                                    disabled={isDisabled || field.disabled}
                                                    onChange={(e) =>
                                                        handleFieldChange(
                                                            field.path,
                                                            e.target.value,
                                                            field.inputType,
                                                            e
                                                        )
                                                    }
                                                />
                                                <label>{field.label}</label>
                                            </div>
                                        </div>
                                    );
                                }

                                case 'button':
                                    return (
                                        <div
                                            key={index}
                                            className={`${hasSplitForm && ''} dropdown-${classesObj?.button || 'md'}`}
                                        >
                                            <button
                                                className={field.className}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (field.onClick) field.onClick(formData, e);
                                                }}
                                                disabled={isDisabled || field.disabled}
                                            >
                                                {field.label}
                                            </button>
                                        </div>
                                    );

                                default:
                                    return null;
                            }
                        })}
                    </div>
                )}

                {showMainButton && setIsMainButtonModalOpen && (
                    <div
                        className={`${hasSplitForm && ''} dropdown-${classesObj?.mainButton || 'md'}`}
                    >
                        <button
                            onClick={() => setIsMainButtonModalOpen((prev) => !prev)}
                            className="button-PRO"
                            disabled={isDisabled}
                        >
                            {mainButtonLabel}
                        </button>
                    </div>
                )}

                {customButton &&
                    buttons?.length > 0 &&
                    buttons.map((btn, idx) => (
                        <div
                            className={`${hasSplitForm && ''} dropdown-${classesObj?.customButton || 'md'}`}
                            key={idx}
                        >
                            <button
                                className={`btn button-PRO btn-${btn.type || 'primary'}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (btn.onClick) btn.onClick(formData, e);
                                }}
                                disabled={isDisabled}
                            >
                                {btn.label}
                            </button>
                        </div>
                    ))}
            </section>
        </fieldset>
    );
};

CommonHeader.propTypes = {
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    formKey: PropTypes.string.isRequired,
    fieldConfig: PropTypes.arrayOf(PropTypes.object),
    isDisabled: PropTypes.bool,
    disabled: PropTypes.bool,
    dropdownDataPath: PropTypes.string,
    onFieldChange: PropTypes.func,
    classNames: PropTypes.string,
    containerGridClass: PropTypes.string,
    classesObj: PropTypes.object,
    splitForm: PropTypes.bool,
    buttonsConfig: PropTypes.shape({
        setIsMainButtonModalOpen: PropTypes.func,
        showMainButton: PropTypes.bool,
        customButton: PropTypes.bool,
        mainButtonLabel: PropTypes.string,
        buttons: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                type: PropTypes.string,
                onClick: PropTypes.func.isRequired,
            })
        ),
    }),
};

export default CommonHeader;
