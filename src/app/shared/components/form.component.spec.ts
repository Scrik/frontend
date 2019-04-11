import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule, HttpXhrBackend } from '@angular/common/http';
import { TestService } from '../../core/services/rest.service.spec';
import { TestModel } from '../../core/models/model.spec';
import { NotificationService } from '../../core/services/notification.service';
import { AuthService } from '../../core/services/auth.service';
import {
  ActivatedRouteStub, AuthServiceStub, BreadcrumbServiceStub, ConfirmationStub, NotificationServiceStub, RestServiceStub,
  RouterStub
} from '../../stubs/stubs.utils';
import { ConfirmationService } from '../../core/services/confirmation.service';
import { FormComponent } from './form.component';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
  selector: 'bs-test-list',
  template: ''
})
export class TestFormComponent extends FormComponent<TestModel> implements OnInit {
  protected _testModel: TestModel = new TestModel();

  constructor(service: TestService,
              router: Router,
              route: ActivatedRoute,
              notificationService: NotificationService,
              breadcrumbsService: BreadcrumbService) {
    super(service, router, route, notificationService, breadcrumbsService);
  }
}

describe('Form Component', () => {
  let comp: TestFormComponent;
  let fixture: ComponentFixture<TestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [TestFormComponent],
      providers: [
        { provide: TestService, useClass: RestServiceStub },
        { provide: NotificationService, useClass: NotificationServiceStub },
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        { provide: Router, useClass: RouterStub },
        { provide: ConfirmationService, useClass: ConfirmationStub },
        { provide: BreadcrumbService, useClass: BreadcrumbServiceStub },
      ]
    });

    fixture = TestBed.createComponent(TestFormComponent);

    comp = fixture.componentInstance;
    comp.ngOnInit();
  });

  it('should be edit or create mode form and save updated model', () => {
    expect(comp.editMode).toBeFalsy();
    comp.model = new TestModel({ id: 99, name: 'new Test Model' });
    comp.save();
  });
});
