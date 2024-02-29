import {AfterContentChecked, Component, ContentChildren, Input, QueryList} from '@angular/core';
import {TabsComponent} from "../tabs/tabs.component";

@Component({
  selector: 'app-tabs-container',
  standalone: true,
  imports: [],
  templateUrl: './tabs-container.component.html',
  styleUrl: './tabs-container.component.css'
})
export class TabsContainerComponent implements AfterContentChecked{

  //adding an input to the tabs container component from the Tabs component to get the tab title

  //contentChildren: QueryList<TabComponent>;
  @ContentChildren(TabsComponent) tabs! : QueryList<TabsComponent>

  constructor() {
  }
    ngAfterContentChecked(): void {


    }

}
