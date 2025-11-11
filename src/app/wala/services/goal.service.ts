import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface GoalRequestDTO {
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  progress?: number;
  status?: string;
  priority?: string;
  ownerId: number;
}

export interface GoalResponseDTO {
  id: number;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  progress: number;
  status: string;
  priority?: string;
  completionDate?: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private baseUrl = 'http://localhost:8222/goal/goals';

  constructor(private http: HttpClient) { }
  

  // Créer un objectif
  createGoal(goal: GoalRequestDTO): Observable<GoalResponseDTO> {
    return this.http.post<GoalResponseDTO>(this.baseUrl, goal);
  }

  // Récupérer un objectif par ID
  getGoalById(id: number): Observable<GoalResponseDTO> {
    return this.http.get<GoalResponseDTO>(`${this.baseUrl}/${id}`);
  }

  // Récupérer tous les objectifs avec pagination et recherche
  getAllGoals(
    search?: string,
    ownerId?: number,
    page: number = 0,
    size: number = 10,
    sortBy: string = 'id',
    sortDirection: string = 'asc'
  ): Observable<PageResponse<GoalResponseDTO>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDirection', sortDirection);

    if (search) {
      params = params.set('search', search);
    }
    if (ownerId) {
      params = params.set('ownerId', ownerId.toString());
    }

    return this.http.get<PageResponse<GoalResponseDTO>>(this.baseUrl, { params });
  }

  // Mettre à jour un objectif
  updateGoal(id: number, goal: GoalRequestDTO): Observable<GoalResponseDTO> {
    return this.http.put<GoalResponseDTO>(`${this.baseUrl}/${id}`, goal);
  }

  // Supprimer un objectif
  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Mettre à jour la progression
  updateProgress(id: number, progress: number): Observable<GoalResponseDTO> {
    return this.http.patch<GoalResponseDTO>(`${this.baseUrl}/${id}/progress?progress=${progress}`, {});
  }

  // Exporter en PDF
  exportToPdf(search?: string, ownerId?: number): Observable<Blob> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (ownerId) params = params.set('ownerId', ownerId.toString());

    return this.http.get(`${this.baseUrl}/export/pdf`, {
      params,
      responseType: 'blob'
    });
  }

  // Exporter en Excel
  exportToExcel(search?: string, ownerId?: number): Observable<Blob> {
    let params = new HttpParams();
    if (search) params = params.set('search', search);
    if (ownerId) params = params.set('ownerId', ownerId.toString());

    return this.http.get(`${this.baseUrl}/export/excel`, {
      params,
      responseType: 'blob'
    });
  }
}
