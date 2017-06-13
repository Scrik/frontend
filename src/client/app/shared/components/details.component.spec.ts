import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestService } from '../../core/services/rest.service.spec';
import { TestModel } from '../../core/models/model.spec';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import { DetailsComponent } from './details.component';
import { ActivatedRouteStub, AuthServiceStub, NotificationServiceStub, RouterStub } from '../../stubs/stubs.utils';

@Component({
  moduleId: module.id,
  selector: 'bs-test-list',
  template: ''
})
export class TestDetailsComponent extends DetailsComponent<TestModel> implements OnInit {
  protected _testModel: TestModel = new TestModel({id:1, name:'test1'});

  constructor(service: TestService,
              activatedRoute: ActivatedRoute) {
    super(service, activatedRoute);
  }

  public ngOnInit() {
    this._update();
  }

  protected _update() {
    super._update();
    this._model = this._testModel;
  }
}

export function main() {
  describe('Details Component', () => {
    let comp: TestDetailsComponent;
    let fixture: ComponentFixture<TestDetailsComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpModule],
        declarations: [TestDetailsComponent],
        providers: [
          TestService,
          { provide: NotificationService, useClass: NotificationServiceStub },
          { provide: AuthService, useClass: AuthServiceStub },
          { provide: XHRBackend, useClass: MockBackend },
          { provide: ActivatedRoute, useClass: ActivatedRouteStub },
          {provide: Router, useClass: RouterStub}
        ]
      });

      fixture = TestBed.createComponent(TestDetailsComponent);

      comp = fixture.componentInstance;
      comp.ngOnInit();
    });

    it('should define a model', () => {
      expect(comp.model).toBeDefined();
      expect(comp.model instanceof TestModel).toBeTruthy();
    });

    it('should call update', () => {
      const testUpdate = spyOn(comp, '_update');

      comp.ngOnInit();
      expect(testUpdate).toHaveBeenCalledTimes(1);
    });
  });
}
