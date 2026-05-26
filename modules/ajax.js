class Ajax {
    async request(url, options = {}) {
        const response = await fetch(url, {
            method: options.method ?? 'GET',
            headers: {
                ...(options.headers ?? {}),
            },
            body: options.body ?? null,
        });

        const text = await response.text();
        let data = null;

        if (text) {
            try {
                data = JSON.parse(text);
            } catch {
                data = text;
            }
        }

        return {
            data,
            status: response.status,
            ok: response.ok,
        };
    }

    get(url) {
        return this.request(url, { method: 'GET' });
    }

    post(url, data) {
        return this.request(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    patch(url, data) {
        return this.request(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    }

    delete(url) {
        return this.request(url, { method: 'DELETE' });
    }
}

export const ajax = new Ajax();