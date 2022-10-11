import React from "react";
import PropTypes from "prop-types";

import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption
} from "@reach/listbox";
import "@reach/listbox/styles.css";
// FIXME load these styles into the asset pipeline properly
import "./EmojiSelect.css";
import { EMOJI_OPTIONS } from "./constants";

function EmojiSelect({ selected, onChange }) {
  function handleChange(value) {
    onChange(value === "reset" ? null : value);
  }

  // FIXME inline styling
  return (
    <div style={{ display: "inline-block" }}>
      <ListboxInput value={selected || ""} onChange={handleChange}>
        <ListboxButton>
          {selected ? EMOJI_OPTIONS[selected].emoji : "React"}
        </ListboxButton>
        <ListboxPopover>
          <ListboxList>
            {selected ? (
              <ListboxOption label="Unreact" value="reset">
                Unreact
              </ListboxOption>
            ) : null}
            {Object.entries(EMOJI_OPTIONS).map(([emojiId, { name, emoji }]) => (
              <ListboxOption key={emojiId} label={name} value={emojiId}>
                {emoji}
              </ListboxOption>
            ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </div>
  );
}

EmojiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  selected: PropTypes.oneOf(Object.keys(EMOJI_OPTIONS))
};

export default EmojiSelect;