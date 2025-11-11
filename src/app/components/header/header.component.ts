import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  isNotificationOpen = false;
  isUserDropdownOpen = false;

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  toggleNotifications(): void {
    this.isNotificationOpen = !this.isNotificationOpen;
    this.isUserDropdownOpen = false;
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
    this.isNotificationOpen = false;
  }

  closeDropdowns(): void {
    this.isNotificationOpen = false;
    this.isUserDropdownOpen = false;
  }
}
