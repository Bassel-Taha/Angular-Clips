import {AfterContentChecked, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {TabsComponent} from "../tabs/tabs.component";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-tabs-container',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.css'
})
export class TabsContainerComponent implements AfterContentChecked{

  //adding an input to the tabs container component from the Tabs component to get the tab title
  @Input() TabTitle: string = '';
  //contentChildren: QueryList<TabComponent>;
  @ContentChildren(TabsComponent) tabs! : QueryList<TabsComponent>

  constructor() {
  }


    ngAfterContentChecked(): void {
      const activeTabs = this.tabs.filter(tab => tab.ActiveTab);
      if (activeTabs === null || activeTabs.length === 0) {
        this.tabs.first.ActiveTab = true;
      }
  }

  selectTab(tab: TabsComponent){
    this.tabs.toArray().forEach(t => t.ActiveTab = false);
    tab.ActiveTab = true;
    return false;
  }
}
