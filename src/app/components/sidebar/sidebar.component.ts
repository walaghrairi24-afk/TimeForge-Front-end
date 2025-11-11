import {Component, Input, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
interface MenuItem {
  icon: string;
  label: string;
  active?: boolean;  // Le ? signifie que cette propriété est optionnelle
  link?: string;     // Le ? signifie que cette propriété est optionnelle
}
@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './sidebar.component.html',
  standalone: true,
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  @Input() isCollapsed = false;

  // Utiliser l'interface MenuItem pour typer le tableau
  menuItems: MenuItem[] = [
    { icon: 'fas fa-project-diagram', label: 'Project', active: true , link: '/'},
    { icon: 'fas fa-tasks', label: 'Task' , link: '/'},
    { icon: 'fas fa-bullseye', label: 'Goal' , link: '/goals'},
    { icon: 'fas fa-gift', label: 'Reward' , link: '/'},
    { icon: 'fas fa-layer-group', label: 'Workspace', link: '/' },
    { icon: 'fas fa-sign-out-alt', label: 'Back to Site', link: '/' }
  ];

  setActive(index: number): void {
    this.menuItems.forEach((item, i) => {
      item.active = i === index;
    });
  }

  ngOnInit(): void {
  }
}
