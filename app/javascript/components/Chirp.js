import * as React from 'react';
import PropTypes from 'prop-types';
import document from 'global/document';

import UserLink from './UserLink';
import RelativeDateTime from './RelativeDateTime';
import EmojiSelect, { EMOJI_OPTIONS } from './EmojiSelect';

export default class Chirp extends React.PureComponent {
  static propTypes = {
    chirp: PropTypes.shape({
      content: PropTypes.string.isRequired,
      author: PropTypes.object.isRequired,
      mentions: PropTypes.arrayOf(PropTypes.object).isRequired,
      created_at: PropTypes.string.isRequired,
      likes_count: PropTypes.number.isRequired,
      liked: PropTypes.bool.isRequired,
      like_url: PropTypes.string.isRequired,
      reactions: PropTypes.shape({
        like_react_count: PropTypes.number,
        lol_react_count: PropTypes.number,
        vom_react_count: PropTypes.number,
        reacted: PropTypes.bool,
        reaction: PropTypes.string,
        reaction_url: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    reacting: false,
    liking: false,
    likeOverride: null,
    likesCountOverride: null
  };

  get liked() {
    if (this.state.likeOverride !== null) {
      return this.state.likeOverride;
    }

    return this.props.chirp.liked;
  }

  renderLikeButton() {
    const { chirp: { like_url } } = this.props;

    return (
      <a
        href={like_url}
        onClick={this.handleLikeButtonClick}
        disabled={this.state.liking}
      >
        {this.liked ? 'Unlike' : 'Like'}
      </a>
    );
  }

  handleLikeButtonClick = (event) => {
    event.preventDefault();

    if (this.state.liking) {
      return;
    }

    const { chirp: { like_url } } = this.props;

    this.setState({ liking: true }, () => {
      fetch(
        `${like_url}.json`,
        {
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          },
          method: this.liked ? 'DELETE' : 'POST'
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          this.setState({ liking: false });
        })
        .then((chirp) => {
          this.setState({
            liking: false,
            likeOverride: chirp.liked,
            likesCountOverride: chirp.likes_count
          });
        });
    });
  };


  handleReactionChange = (reaction) => {
    console.log(`Reaction changed to ${reaction}`);

    if (this.state.reacting) {
      return;
    }

    const { chirp: { reactions: { reaction_url } } } = this.props;

    this.setState({ reacting: true }, () => {
      fetch(
        `${reaction_url}.json?reaction_type=${reaction}`,
        {
          // body: JSON.stringify({ reaction_type: reaction }), // <-- this is not working
          headers: {
            'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
          },
          method: 'POST'
        }
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          this.setState({ reacting: false });
        });
    });
  };

  renderLikesCount() {
    const likes = this.state.likesCountOverride !== null ? this.state.likesCountOverride : this.props.chirp.likes_count;

    return `${likes} like${likes === 1 ? '' : 's'}`;
  }

  renderReactionsCount() {
    return (
      <div style={{ display: "inline-block" }}>
        <span
          key="reaction-like"
          role="img"
          aria-label={EMOJI_OPTIONS.like.name}
        >
          {EMOJI_OPTIONS.like.emoji}
        </span>
        {" "}
        <span>{this.props.chirp.reactions.like_react_count}</span>
        {" "}
        <span
          key="reaction-lol"
          role="img"
          aria-label={EMOJI_OPTIONS.lol.name}
        >
          {EMOJI_OPTIONS.lol.emoji}
        </span>
        {" "}
        <span>{this.props.chirp.reactions.lol_react_count}</span>
        {" "}
        <span
          key="reaction-vom"
          role="img"
          aria-label={EMOJI_OPTIONS.vom.name}
        >
          {EMOJI_OPTIONS.vom.emoji}
        </span>
        {" "}
        <span>{this.props.chirp.reactions.vom_react_count}</span>
      </div>
    );
  }

  render() {
    const { chirp } = this.props;

    const knownMentions = chirp.mentions.reduce((accumulator, value) => {
      accumulator[value.name.toLowerCase()] = value;
      return accumulator;
    }, {});

    // JS can't do negative lookbehinds yet (https://caniuse.com/mdn-javascript_builtins_regexp_lookbehind_assertion),
    // so we need more manual checks in how we process mentions into links
    const output = chirp.content.split(/(@\w+)/).map((segment, index, array) => {
      if ((index === 0 || array[index - 1].match(/[^\w]$/)) && segment.startsWith('@')) {
        const slicedSegment = segment.slice(1).toLowerCase();

        if (Object.prototype.hasOwnProperty.call(knownMentions, slicedSegment)) {
          return <UserLink user={knownMentions[slicedSegment]} key={index} />; // eslint-disable-line react/no-array-index-key
        }
      }

      return segment;
    });

    return (
      <div>
        <p>{ output }</p>
        -- <UserLink user={chirp.author} />
        {', '}
        <RelativeDateTime value={chirp.created_at} />
        {' • '}
        {this.renderLikesCount()}
        {' • '}
        {this.renderLikeButton()}
        {' • '}
        {this.renderReactionsCount()}
        {' • '}
        <EmojiSelect onChange={this.handleReactionChange} selected={this.props.chirp.reactions.reaction} />
      </div>
    );
  }
}
