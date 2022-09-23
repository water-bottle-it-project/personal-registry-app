import type { DataSourceArray, UIElementData } from 'photoswipe';
import type PhotoSwipe from 'photoswipe';

const preview: UIElementData = {
  name: 'bulletsIndicator',
  order: 9,
  isButton: false,
  appendTo: 'wrapper',
  onInit: (el: HTMLElement, pswpInstance: PhotoSwipe) => {
    let prevIndex = -1;
    const thumbnails: HTMLElement[] = [];

    /* eslint-disable no-param-reassign */
    el.style.position = 'absolute';
    el.style.bottom = '20px';
    el.style.left = '10px';
    el.style.right = '0';
    el.style.display = 'grid';
    el.style.gridGap = '10px';
    el.style.gridTemplateColumns = 'repeat(auto-fit, 40px)';
    el.style.gridTemplateRows = 'repeat(auto-fit, 40px)';
    el.style.justifyContent = 'center';
    /* eslint-enable no-param-reassign */

    const dataSource = pswpInstance.options.dataSource as DataSourceArray;

    for (let i = 0; i < dataSource.length; i++) {
      const slideData = dataSource[i];

      const thumbnail = document.createElement('div');
      thumbnail.style.transition = 'transform 0.15s ease-in';
      thumbnail.style.opacity = '0.6';
      thumbnail.style.cursor = 'pointer';
      thumbnail.onclick = (e: MouseEvent) => {
        const target = e.target as HTMLImageElement | HTMLDivElement;
        const thumbnailEl =
          target.tagName === 'IMG'
            ? target.parentElement
            : (e.target as HTMLImageElement | HTMLDivElement);
        if (thumbnailEl) {
          pswpInstance.goTo(thumbnails.indexOf(thumbnailEl));
        }
      };

      const thumbnailImage = document.createElement('img');
      thumbnailImage.setAttribute('src', slideData.msrc as string);
      thumbnailImage.style.width = '100%';
      thumbnailImage.style.height = '100%';
      thumbnailImage.style.objectFit = 'cover';

      thumbnail.appendChild(thumbnailImage);

      el.appendChild(thumbnail);

      thumbnails.push(thumbnail);
    }

    pswpInstance.on('change', () => {
      if (prevIndex >= 0) {
        const prevThumbnail = thumbnails[prevIndex];
        prevThumbnail.style.opacity = '0.6';
        prevThumbnail.style.cursor = 'pointer';
        prevThumbnail.style.transform = 'scale(1)';
      }

      const currentThumbnail = thumbnails[pswpInstance.currIndex];
      currentThumbnail.style.opacity = '1';
      currentThumbnail.style.cursor = 'unset';
      currentThumbnail.style.transform = 'scale(1.2)';

      prevIndex = pswpInstance.currIndex;
    });
  },
};

export { preview };
