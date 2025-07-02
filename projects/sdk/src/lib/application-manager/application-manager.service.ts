import { isPlatformServer } from '@angular/common';
import { inject, Injectable, makeStateKey, PendingTasks, PLATFORM_ID, signal, TransferState, DOCUMENT } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SDKApplicationManager {
  private readonly platformId = inject<object>(PLATFORM_ID);
  private readonly transferState = inject(TransferState);
  public readonly pendingTasks = inject(PendingTasks);

  get lang() {
    return 'sv';
  }

  get isServer() {
    return isPlatformServer(this.platformId);
  }

  /**
   * Adds support for hydrating data coming from dynamic imports.
   * Note that the target file of the import must be included in the TS compilation by adding it to the "includes" field of the app's `tsconfig.app.json` file (or `tsconfig.lib.json` if part of a library).
   * @param importStatementFn A callback that returns a dynamic import statement relative to where this method is called from. Note that the target file's export must be a `default` export. Example: () => import(`./menus/menu.${this.applicationManager.lang}.ts`)
   * @param cacheKey The key to store the data in - must be unique. Example: `makeStateKey('myUniqueKey')`
   * @param defaultValue A default value if the data isn't present in the transferred state for any reason.
   * @returns The cached data if app is running with SSR, otherwise the loaded data
   */
  async cacheDynamicImport<T>(importStatementFn: () => Promise<T>, cacheKey: string, defaultValue: T): Promise<T> {

    const taskInProgress = this.pendingTasks.add();
    const stateKey = makeStateKey<T>(cacheKey);

    if (this.isServer) {
      // IMPORTANT: For this to work the target file of the import defined here must be included in the TS compilation by adding it to the "includes" field of the app's tsconfig.app.json file
      const m: Awaited<any> = await importStatementFn();
      this.transferState.set(stateKey, m.default);

      taskInProgress();

      return this.transferState.get(stateKey, defaultValue);
    } else {
      // This will be false if app is running in local development without SSR, or if fetching failed for some reason
      if (this.transferState.hasKey(stateKey)) {

        return new Promise(res => {
          taskInProgress();
          res(this.transferState.get(stateKey, defaultValue));
        });
      }

      const m: Awaited<any> = await importStatementFn();

      taskInProgress();

      return m.default;
    }
  }
}
