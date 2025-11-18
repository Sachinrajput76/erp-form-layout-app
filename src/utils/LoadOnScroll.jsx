import PropTypes from "prop-types";

export default function LoadOnScroll({
    id,
    name,
    opData,
    placeholder,
    label,
    saveText,
    onChange,
    value,
    disabled,
    shortCode,  // Field name in option object that contains the shortCode
    showShortCode,  // Boolean to control whether to show shortCode
    shortCodePosition,  // Position: 0 = before, 1 = after
}) {
    // Function to format the option text with shortCode
    const formatOptionText = (item) => {
        if (!showShortCode || !item[shortCode]) {
            return item[label];
        }

        const shortCodeText = item[shortCode];
        const labelText = item[label];

        if (shortCodePosition === "0") {
            return `${shortCodeText} - ${labelText}`;
        } else {
            return `${labelText} - ${shortCodeText}`;
        }
    };

    return (
        <select
            id={id}
            name={name}
            disabled={disabled}
            value={value}
            className="load-select"
            onChange={(e) => {
                const selected = opData.find((d) => d.value == e.target.value);
                onChange(selected);
            }}
        >
            <option value="">{placeholder}</option>
            {opData.map((item) => (
                <option key={item.value} value={item.value}>
                    {formatOptionText(item)}
                </option>
            ))}
        </select>
    );
}

LoadOnScroll.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    opData: PropTypes.array,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    saveText: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.any,
    disabled: PropTypes.bool,
    shortCode: PropTypes.string,  // New prop for shortCode field name
    showShortCode: PropTypes.bool,  // New prop to control showing shortCode
    shortCodePosition: PropTypes.number,  // New prop for position (0=before, 1=after)
};