import { Component, Prop, PropWillChange } from '@stencil/core';


@Component({
  tag: 'slot-3d',
  // styleUrl: 'slot-3d.scss'
})
export class Slot3D {

  @Prop() name: string;
  @Prop() image: string;
  @Prop() running: boolean;

  @PropWillChange('running') runningWillChange(newValue: boolean) {
    console.log(newValue);
  }

  render() {
    console.log(this.name, this.image);

    return (
      <li class="text-item-wrap text-center mk-slot-item" >
        <img src={this.image} /><br />
        <span class="mk-label">{this.name}</span>
      </li>
    );
  }
}
