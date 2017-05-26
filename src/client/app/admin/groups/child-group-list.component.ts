import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupModel } from '../../core/models/group-model';
import { GroupService } from '../../core/services/group.service';
import { ListComponent } from '../../shared/components/list.component';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  moduleId: module.id,
  selector: 'bs-child-group-list',
  templateUrl: 'child-group-list.component.html'
})
export class ChildGroupListComponent extends ListComponent<GroupModel> implements OnInit, OnChanges {
  protected _parentId: string = 'null';

  @Input()
  public set parentId(value: string) {
    this._parentId = value;
  }

  public get parentId() {
    return this._parentId;
  }

  constructor(service: GroupService,
              activatedRoute: ActivatedRoute,
              router: Router,
              notificationService: NotificationService) {
    super(service, activatedRoute, router, notificationService);
  }

  public ngOnInit() {
    this._queryParams.parentId = this._parentId;
    super.ngOnInit();
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['parentId']) {
      Object.assign(this._queryParams, { parentId: this._parentId });
      this._update();
    }
  }
}
