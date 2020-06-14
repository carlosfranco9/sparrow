const uuid = require('@lukeed/uuid');
import * as cheerio from 'cheerio';

export default class Box{
  public uuid = '';
  public components:any = [];
  public $fragment: any;
  name: string = 'box';
  label: string = '';

  constructor () {
    this.uuid = uuid().split('-')[0]; 
  }
  
  addComponent (data: any) {
    const curData = data;
    this.label = curData.key;
    const dynamicObj = require(`./${curData.id}`).default;
    this.components.push(new dynamicObj(curData));
    this.renderTemplate();
  }

  renderTemplate () {
    if (!this.components[0]) {
      this.$fragment = cheerio.load(`
        <div class="block-list">
          <box 
            :uuid="'${this.uuid}'" 
            class="block-item"
            
          >
            <paragraph 
              :type="'Container'" 
              :emit="'client.component.show'"
              :params="{uuid: '${this.uuid}'}"></paragraph>
          </box>
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    } else {
      this.$fragment =  cheerio.load(`
        <div class="block-list">
            <box 
              :uuid="'${this.uuid}'" 
              class="block-item" 
              :label="'${this.label}'"
            >
              ${this.components[0].getFragment().html()}
            </box>  
        </div>
      `, {
        xmlMode: true,
        decodeEntities: false
      });
    }
  }

  getFragment () {
    this.renderTemplate();
    return this.$fragment;
  }

  getFragmentOther () {
    if (this.components[0]) {
      return this.components[0].getFragmentOther(); 
    }
    return null;
  }
}