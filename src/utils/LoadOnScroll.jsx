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
}) {
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
                    {item[label]}
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
};
