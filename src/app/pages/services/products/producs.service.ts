import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, docData, getFirestore, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Storage, getDownloadURL, ref, uploadBytes } from '@angular/fire/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private firestore: Firestore,
    private storage: Storage
  ) { }

  // 📤 Upload da imagem e retorno da URL
  async uploadImage(file: File, productId: string): Promise<string> {
    const path = `products/${productId}/${file.name}`;
    const storageRef = ref(this.storage, path);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }
  

  // ✅ CREATE
  create(product: any): Promise<void> {
    const db = getFirestore(); // ou use via AngularFire se estiver injetando
    const productRef = doc(collection(db, 'products'));

    return setDoc(productRef, {
      ...product,
      id: productRef.id
    });
  }

  // 📥 READ (listar todos)
  getAll(): Observable<any[]> {
    const productsRef = collection(this.firestore, 'products');
    return collectionData(productsRef, { idField: 'id' }) as Observable<any[]>;
  }

  // 🔄 UPDATE (sem manipulação de imagem)
  async update(id: string, data: Partial<any>): Promise<void> {
    const docRef = doc(this.firestore, `products/${id}`);
    await updateDoc(docRef, data);
  }

  // ❌ DELETE (sem deletar imagem do storage)
  async delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, `products/${id}`);
    await deleteDoc(docRef);
  }

  getProductsByCategory(category: string): Observable<any[]> {
    const ref = collection(this.firestore, 'products');
    const q = query(ref, where('category', '==', category));
    return collectionData(q, { idField: 'id' }) as Observable<any[]>;
  }

  getProductById(id: string): Observable<any> {
    const productDocRef = doc(this.firestore, `products/${id}`);
    return docData(productDocRef, { idField: 'id' }) as Observable<any>;
  }
}
