import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './authentication/login/login.component';
import { ForgotPassComponent } from './authentication/forgot-pass/forgot-pass.component';
import { CreateAccComponent } from './acc-management/create-acc/create-acc.component';
import { HomeComponent } from './share/home/home.component';
import { HeaderComponent } from './share/header/header.component';
import { ErrorComponent } from './share/error/error.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './employee/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './employee/list-employee/list-employee.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from './share/loading-spinner/loading-spinner.component';
import { HeaderHandlerInterceptor } from './authentication/interceptor/header-handler.interceptor';
import { ListAccComponent } from './acc-management/list-acc/list-acc.component';
import { EditAccComponent } from './acc-management/edit-acc/edit-acc.component';
import { RegisterComponent } from './authentication/register/register.component';
import { SidenavComponent } from './share/sidenav/sidenav.component';
import { ListProductComponent } from './product/list-product/list-product.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomePageComponent } from './customer/home-page/home-page.component';
import { CategoryComponent } from './customer/category/category.component';
import { MenuComponent } from './customer/menu/menu.component';
import { CartComponent } from './customer/cart/cart.component';
import { PaymentComponent } from './customer/payment/payment.component';
import { DishDetailComponent } from './customer/dish-detail/dish-detail.component';
import { FooterComponent } from './share/footer/footer.component';
import { FormatPrice } from './share/pipe/price-format.pipe';
import { DisplayItem } from './share/pipe/display-item.pipe';
import { AddUsernameComponent } from './employee/add-username/add-username.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { ProductListComponent } from './cashier/product-list/product-list.component';
import { BillListComponent } from './cashier/bill-list/bill-list.component';
import { CashierScreenComponent } from './cashier/cashier-screen/cashier-screen.component';
import { ReportUserComponent } from './report/report-user/report-user.component';
import { SwaggerComponent } from './server-management/swagger/swagger.component';
import { ManageAccountComponent } from './acc-management/manage-acc/manage-acc.component';
import { EditAccAddressComponent } from './acc-management/edit-acc-address/edit-acc-address.component';
import { ChangePassComponent } from './acc-management/change-pass/change-pass.component';
import { CreatePaymentVoucherComponent } from './bussiness-management/create-payment-voucher/create-payment-voucher.component';
import { CashManagementComponent } from './bussiness-management/cash-management/cash-management.component';
import { UpdateCashComponent } from './bussiness-management/update-cash/update-cash.component';
import { ReportLossProfitComponent } from './bussiness-management/report-loss-profit/report-loss-profit.component';
import { InfrastructureManagementComponent } from './bussiness-management/infrastructure-management/infrastructure-management.component';
import { ConfirmDialogComponent } from './share/confirm-dialog/confirm-dialog.component';
import { ModifyInfrastructureListComponent } from './bussiness-management/modify-infrastructure-list/modify-infrastructure-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPassComponent,
    CreateAccComponent,
    HomeComponent,
    HeaderComponent,
    ErrorComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeeComponent,
    LoadingSpinnerComponent,
    ListAccComponent,
    EditAccComponent,
    RegisterComponent,
    SidenavComponent,
    ListProductComponent,
    AddProductComponent,
    HomePageComponent,
    CategoryComponent,
    MenuComponent,
    CartComponent,
    PaymentComponent,
    DishDetailComponent,
    FooterComponent,
    DisplayItem,
    FormatPrice,
    AddUsernameComponent,
    ProductListComponent,
    BillListComponent,
    CashierScreenComponent,
    ReportUserComponent,
    SwaggerComponent,
    ManageAccountComponent,
    EditAccAddressComponent,
    ChangePassComponent,
    CreatePaymentVoucherComponent,
    CashManagementComponent,
    UpdateCashComponent,
    ReportLossProfitComponent,
    InfrastructureManagementComponent,
    ConfirmDialogComponent,
    ModifyInfrastructureListComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatTabsModule,
    MatBadgeModule,
    MatMenuModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    NgbModule,
    CarouselModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    MatSnackBarModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderHandlerInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmDialogComponent, CreateAccComponent, AddUsernameComponent, EditAccAddressComponent, ChangePassComponent, UpdateCashComponent]
})
export class AppModule { }
