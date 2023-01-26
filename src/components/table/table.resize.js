import {$} from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCords();
    const type = $resizer.data.resize;
    const sideProp = type === 'col' ? 'bottom' : 'right';
    let value;

    $resizer.css({
      opacity: 1,
      [sideProp]: '-5000px',
    });

    document.onmousemove = (e) => {
      if (type === 'col') {
        const delta = e.pageX - coords.right;
        value = coords.width + delta;
        $resizer.css({
          right: -delta + 'px',
        });
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({
          bottom: -delta + 'px',
        });
      }
    };

    document.onmouseup = () => {
      document.onmouseup = null;
      document.onmousemove = null;

      if (type === 'col') {
        $root.findAll(`[data-col="${$parent.data.col}"]`)
            .forEach((e) => e.style.width = value + 'px');
      } else {
        $parent.css({height: value + 'px'});
      }

      resolve({
        // id: type === 'col' ? $parent.data.col : $parent.data.row,
        id: $parent.data[type],
        type,
        value,
      });

      $resizer.css({
        right: 0,
        opacity: 0,
        bottom: 0,
      });
    };
  });
}
