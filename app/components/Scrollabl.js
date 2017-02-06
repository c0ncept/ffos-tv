import h from '../tools/hyper';
import scrollIntoView from 'scroll-into-view';

function Scrollabl (props) {
  if (!props) return this;

  const childs = [].concat.apply([], [].slice.call(arguments, 1, arguments.length));

  function onFocus (evt) {
    if (props.animate) {
      evt.stopPropagation();
      evt.preventDefault();
      setTimeout(
        function () { evt.target && evt.target.focus(); },
        100
      );
    }

    activateEl(evt.target);
    scrollIntoView(evt.target, {
      time: 300,
      align: {
        top: 0.5,
        left: 0.5
      }
    });
  }

  function activateEl (target) {
    if ('activate' in props) {
      [].slice.call(target.parentNode.childNodes)
        .forEach((n) => n.classList.remove(props.activate));
      target.classList.add(props.activate);
    }
  }

  function onUnfocus (evt) {
  }

  childs.forEach(function (child) {
    if ('focusable' in child.props && child.props.focusable) {
      child.props.onFocusx = onFocus;
    }
    if ('activate' in props) {
      child.props.onUnfocusx = onUnfocus;
    }
  });

  return h.apply(null, ['div', props].concat(childs));
};

export default Scrollabl;

