import { Component, Element, Prop, PropWillChange } from '@stencil/core';


@Component({
  tag: 'slot-3d-container',
  styleUrl: 'slot-3d-container.scss'
})
export class Slot3DContainer {

  @Prop() items: string;
  @Prop() running: boolean;

  @PropWillChange('running') onRunningChanging(newValue: boolean) {
    if (this.wheel.spinner) {
      if (newValue) {
        this.wheel.spinner.classList.add('mk-spinning');
      } else {
        this.wheel.spinner.classList.remove('mk-spinning');
      }
    }
  }

  @Element() slotContainer: HTMLElement;
  wheel: Wheel = {
    element: null,
    item: 0,
    spinner: null,
    tiles: null,
    itemAngle: 0,
    itemCount: 0,
    translateZ: 0
  };

  constructor() {
    this.wheel.element = this.slotContainer;
    this.wheel.spinner = this.slotContainer.getElementsByClassName('mk-spinner').item(0);
    this.wheel.tiles = this.wheel.spinner.children;

    let panelSize: number = this.wheel.tiles[0].clientHeight;
    let itemCount: number = this.wheel.tiles.length;
    let itemAngle: number = 360 / itemCount;
    let tz: number = Math.round((panelSize / 2) / Math.tan(Math.PI / itemCount));
    let translateZ: string = `translateZ(${tz}px)`;

    for (let i = 0; i < itemCount; i++) {
      // Set 3D Rotation
      var rotate = 'rotateX(' + i * itemAngle + 'deg)';
      var el = this.wheel.tiles[i] as HTMLInputElement;
      el.style.transform = rotate + ' ' + translateZ;
    }

    // We'll need these later
    this.wheel.translateZ = -tz;
    this.wheel.item = 0;
    this.wheel.itemAngle = -itemAngle;
    this.wheel.itemCount = itemCount;

    // Set the initial value to something random
    var r = Math.floor(Math.random() * (this.wheel.itemCount - 1));
    this.setItem(r);
  }

  setItem(item) {
    if (item < 0 || item > this.wheel.itemCount) { item = 0; }

    this.wheel.item = item;

    // Transform the container opposite the item's transform.
    var rotate = 'rotateX(' + item * this.wheel.itemAngle + 'deg)';
    this.transform(rotate);
  }

  transform(rotate) {
    var spinner = this.wheel.spinner as HTMLInputElement;
    spinner.style.transform = rotate;
  }

  render() {
    let items = JSON.parse(this.items);
    console.log(items, Array.isArray(items));
    return (
      <div>
        <div class="mk-slotContainer">
          <ul class="mk-spinner mk-spinning">
            {
              items.map(item => {
                return (
                  <slot-3d name={item.name} image={item.image}></slot-3d>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}

interface Wheel {
  element: HTMLElement,
  spinner: Element,
  tiles: HTMLCollection,
  item: number,
  translateZ: number,
  itemAngle: number,
  itemCount: number
}
