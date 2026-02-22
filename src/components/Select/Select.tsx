import React, {
  forwardRef,
  MutableRefObject,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { clsx } from "clsx";
import { ChevronDown, X, Search, Check } from "lucide-react";
import { SelectProps, SelectOption } from "./Select.types";

const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      options,
      value,
      defaultValue,
      placeholder = "Select an option",
      disabled = false,
      required = false,
      error = false,
      helperText,
      className,
      variant = "default",
      size = "md",
      searchable = false,
      clearable = false,
      loading = false,
      multiple = false,
      maxVisible = 5,
      onChange,
      onSearch,
      onOpen,
      onClose,
      ...props
    },
    ref,
  ) => {
    const selectRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState(-1);

    const [singleValue, setSingleValue] = useState<string | number | null>(
      Array.isArray(defaultValue) ? null : (defaultValue ?? null),
    );
    const [multiValues, setMultiValues] = useState<Array<string | number>>(
      Array.isArray(defaultValue) ? defaultValue : [],
    );

    const currentValue =
      !multiple && !Array.isArray(value) ? (value ?? singleValue) : singleValue;
    const selectedValues =
      multiple && Array.isArray(value) ? value : multiValues;

    const getSelectedOption = useCallback(() => {
      if (multiple) {
        return options.filter((option) => selectedValues.includes(option.value));
      }
      return options.find((option) => option.value === currentValue);
    }, [options, currentValue, multiple, selectedValues]);

    const selectedOption = getSelectedOption();

    const filteredOptions = options.filter((option) => {
      if (!searchable || !searchQuery) return true;
      return option.label.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const groupedOptions = filteredOptions.reduce(
      (acc, option) => {
        const group = option.group || "default";
        if (!acc[group]) acc[group] = [];
        acc[group].push(option);
        return acc;
      },
      {} as Record<string, SelectOption[]>,
    );

    const closeDropdown = useCallback(() => {
      setIsOpen(false);
      setHighlightedIndex(-1);
      onClose?.();
    }, [onClose]);

    const handleSelect = (option: SelectOption) => {
      if (option.disabled) return;

      if (multiple) {
        const newValues = selectedValues.includes(option.value)
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];

        if (!Array.isArray(value)) {
          setMultiValues(newValues);
        }
        onChange?.(newValues);
      } else {
        closeDropdown();
        if (option.value !== currentValue) {
          if (value === undefined || Array.isArray(value)) {
            setSingleValue(option.value);
          }
          onChange?.(option.value);
        }
      }
    };

    const handleClear = () => {
      if (multiple) {
        if (!Array.isArray(value)) {
          setMultiValues([]);
        }
        onChange?.([]);
      } else {
        if (value === undefined || Array.isArray(value)) {
          setSingleValue(null);
        }
        onChange?.(null);
      }
      setSearchQuery("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsOpen(true);
          onOpen?.();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
            handleSelect(filteredOptions[highlightedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          closeDropdown();
          break;
      }
    };

    const handleClickOutside = useCallback(
      (event: MouseEvent) => {
        if (
          selectRef.current &&
          !selectRef.current.contains(event.target as Node)
        ) {
          closeDropdown();
        }
      },
      [closeDropdown],
    );

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, [handleClickOutside]);

    useEffect(() => {
      if (searchable && isOpen) {
        inputRef.current?.focus();
      }
    }, [isOpen, searchable]);

    useEffect(() => {
      onSearch?.(searchQuery);
    }, [searchQuery, onSearch]);

    const getOptionLabel = () => {
      if (multiple) {
        if (selectedValues.length === 0) return placeholder;
        return "";
      }
      return (selectedOption as SelectOption | undefined)?.label || placeholder;
    };

    const hasSelection = multiple ? selectedValues.length > 0 : Boolean(currentValue);
    const selectedOptionList = (selectedOption as SelectOption[] | undefined) ?? [];

    const panelMaxHeight = Math.max(176, maxVisible * 40);
    const assignWrapperRef = (node: HTMLDivElement | null) => {
      selectRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as MutableRefObject<HTMLDivElement | null>).current = node;
      }
    };

    return (
      <div
        ref={assignWrapperRef}
        className={clsx("pw-select-wrapper", className)}
        {...props}
      >
        <div
          className={clsx(
            "pw-select",
            `pw-select--${size}`,
            `pw-select--${variant}`,
            {
              "pw-select--open": isOpen,
              "pw-select--disabled": disabled,
              "pw-select--error": error,
            },
          )}
          onClick={() => {
            if (disabled || loading) return;
            setIsOpen((prev) => {
              const next = !prev;
              if (next) onOpen?.();
              else onClose?.();
              return next;
            });
          }}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-required={required}
          aria-expanded={isOpen}
          aria-disabled={disabled}
        >
          {multiple && hasSelection ? (
            <div className="pw-select__chips" aria-label="Selected values">
              {selectedOptionList.map((option) => (
                <button
                  key={`chip-${option.value}`}
                  type="button"
                  className="pw-select__chip"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option);
                  }}
                  aria-label={`Remove ${option.label}`}
                >
                  <span className="pw-select__chip-label">{option.label}</span>
                  <span className="pw-select__chip-remove">x</span>
                </button>
              ))}
            </div>
          ) : (
            <span
              className={clsx("pw-select__value", {
                "pw-select__value--placeholder": !hasSelection,
              })}
            >
              {getOptionLabel()}
            </span>
          )}

          <div className="pw-select__controls">
            {loading && <span className="pw-select__spinner" />}

            {clearable && hasSelection && !disabled && !loading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="pw-select__clear"
                aria-label="Clear selection"
              >
                <X size={14} />
              </button>
            )}

            <ChevronDown
              size={16}
              className={clsx("pw-select__chevron", {
                "pw-select__chevron--open": isOpen,
              })}
            />
          </div>
        </div>

        {isOpen && (
          <div className="pw-select__dropdown" style={{ maxHeight: panelMaxHeight }}>
            {searchable && (
              <div className="pw-select__search">
                <Search size={14} className="pw-select__search-icon" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search options..."
                  className="pw-select__search-input"
                />
              </div>
            )}

            <ul
              className="pw-select__list"
              role="listbox"
              aria-multiselectable={multiple}
            >
              {Object.entries(groupedOptions).map(([group, groupOptions]) => (
                <li key={group}>
                  {group !== "default" && (
                    <div className="pw-select__group-label">{group}</div>
                  )}

                  {groupOptions.slice(0, maxVisible).map((option) => {
                    const isSelected = multiple
                      ? selectedValues.includes(option.value)
                      : option.value === currentValue;
                    const isHighlighted =
                      filteredOptions.indexOf(option) === highlightedIndex;

                    return (
                      <button
                        key={`${group}-${option.value}`}
                        role="option"
                        aria-selected={isSelected}
                        disabled={option.disabled}
                        className={clsx("pw-select__option", {
                          "pw-select__option--selected": isSelected,
                          "pw-select__option--highlighted": isHighlighted,
                        })}
                        onClick={() => handleSelect(option)}
                      >
                        <span className="pw-select__option-label">{option.label}</span>
                        {isSelected && <Check size={14} className="pw-select__check" />}
                      </button>
                    );
                  })}
                </li>
              ))}
            </ul>

            {filteredOptions.length === 0 && (
              <div className="pw-select__empty">No options found</div>
            )}
          </div>
        )}

        {helperText && (
          <p
            className={clsx("pw-select__helper", {
              "pw-select__helper--error": error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
