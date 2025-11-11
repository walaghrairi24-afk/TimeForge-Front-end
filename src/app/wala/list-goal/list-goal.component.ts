import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GoalResponseDTO, GoalService, PageResponse } from '../services/goal.service';

@Component({
  selector: 'app-list-goal',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './list-goal.component.html',
  standalone: true,
  styleUrl: './list-goal.component.css'
})
export class ListGoalComponent implements OnInit {
  goals: GoalResponseDTO[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalElements: number = 0;
  totalPages: number = 0;

  // Filtres
  searchTerm: string = '';
  ownerIdFilter: number | null = null;

  // Tri
  sortBy: string = 'id';
  sortDirection: string = 'asc';

  // États
  isLoading: boolean = false;
  exportLoading: boolean = false;

  // Colonnes pour le tri
  columns = [
    { key: 'id', label: 'ID' },
    { key: 'title', label: 'Titre' },
    { key: 'startDate', label: 'Date Début' },
    { key: 'endDate', label: 'Date Fin' },
    { key: 'progress', label: 'Progression' },
    { key: 'status', label: 'Statut' },
    { key: 'priority', label: 'Priorité' },
    { key: 'createdAt', label: 'Créé le' }
  ];

  constructor(
    private goalService: GoalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGoals();
  }

  loadGoals(): void {
    this.isLoading = true;
    this.goalService.getAllGoals(
      this.searchTerm || undefined,
      this.ownerIdFilter || undefined,
      this.currentPage,
      this.pageSize,
      this.sortBy,
      this.sortDirection
    ).subscribe({
      next: (response: PageResponse<GoalResponseDTO>) => {
        this.goals = response.content;
        this.totalElements = response.totalElements;
        this.totalPages = response.totalPages;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.isLoading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadGoals();
  }

  onResetFilters(): void {
    this.searchTerm = '';
    this.ownerIdFilter = null;
    this.currentPage = 0;
    this.sortBy = 'id';
    this.sortDirection = 'asc';
    this.loadGoals();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadGoals();
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.loadGoals();
  }

  onSort(column: string): void {
    if (this.sortBy === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortBy = column;
      this.sortDirection = 'asc';
    }
    this.loadGoals();
  }

  onEditGoal(id: number): void {
    this.router.navigate(['/goals', id, 'edit']);
  }

  onViewGoal(id: number): void {
    this.router.navigate(['/goals', id]);
  }

  onDeleteGoal(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet objectif ?')) {
      this.goalService.deleteGoal(id).subscribe({
        next: () => {
          this.loadGoals();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }

  onUpdateProgress(goal: GoalResponseDTO): void {
    const newProgress = prompt('Nouvelle progression (%)', goal.progress.toString());
    if (newProgress !== null) {
      const progressValue = parseFloat(newProgress);
      if (!isNaN(progressValue) && progressValue >= 0 && progressValue <= 100) {
        this.goalService.updateProgress(goal.id, progressValue).subscribe({
          next: (updatedGoal) => {
            // Mettre à jour l'objet goal directement
            const index = this.goals.findIndex(g => g.id === goal.id);
            if (index !== -1) {
              this.goals[index] = updatedGoal;
            }
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour:', error);
            alert('Erreur lors de la mise à jour de la progression');
          }
        });
      } else {
        alert('Veuillez entrer un nombre entre 0 et 100');
      }
    }
  }

  onExportPdf(): void {
    this.exportLoading = true;
    this.goalService.exportToPdf(
      this.searchTerm || undefined,
      this.ownerIdFilter || undefined
    ).subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'goals_export.pdf', 'application/pdf');
        this.exportLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'export PDF:', error);
        this.exportLoading = false;
        alert('Erreur lors de l\'export PDF');
      }
    });
  }

  onExportExcel(): void {
    this.exportLoading = true;
    this.goalService.exportToExcel(
      this.searchTerm || undefined,
      this.ownerIdFilter || undefined
    ).subscribe({
      next: (blob) => {
        this.downloadFile(blob, 'goals_export.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        this.exportLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors de l\'export Excel:', error);
        this.exportLoading = false;
        alert('Erreur lors de l\'export Excel');
      }
    });
  }

  private downloadFile(blob: Blob, filename: string, contentType: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  get pages(): number[] {
    const pages = [];
    const startPage = Math.max(0, this.currentPage - 2);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  getSortIcon(column: string): string {
    if (this.sortBy !== column) return '↕️';
    return this.sortDirection === 'asc' ? '⬆️' : '⬇️';
  }

  getProgressColor(progress: number): string {
    if (progress >= 100) return 'completed-progress';
    if (progress >= 75) return 'high-progress';
    if (progress >= 50) return 'medium-progress';
    if (progress >= 25) return 'low-progress';
    return 'minimal-progress';
  }

  getPriorityBadgeClass(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed': return 'completed';
      case 'in progress': return 'in-progress';
      case 'not started': return 'not-started';
      case 'cancelled': return 'cancelled';
      default: return 'not-started';
    }
  }
}
