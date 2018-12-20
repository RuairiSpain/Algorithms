export class QuickUnionUF {
    id = null;
    size = null;

    constructor(N: number) {
        this.id = Array.from(Array(N).keys());
        this.size = Array(N).fill(1);
    }

    root(i: number): number {
        /*
        With Path Compression - Path compression keeps the tree completely flat!
        */
        if (i == this.id[i]) {
            return i;
        }
        this.id[i] = this.root(this.id[i]);
        return this.id[i];
    }

    connected(p: number, q: number): boolean {
        const result = this.root(p) === this.root(q);
        console.log(`${p} and ${q} whether connected: ${result}`);
        return result;
    }

    union(p: number, q: number): void {
        const i = this.root(p);
        const j = this.root(q);
        if (i === j) {
            return;
        }
        if (this.size[i] < this.size[j]) {
            // tree p is smaller than q tree -> merge p into q
            this.id[i] = j;
            this.size[j] += this.size[i];
            console.log(`Attach root(${p}) = ${i} to root(${q}) = ${j}. Size root(${q}) = ${this.size[j]}`);
        } else {
            // tree p is equal or bigger than q tree -> merge q into p
            this.id[j] = i;
            this.size[i] += this.size[j];
            console.log(`Attach root(${q}) = ${j} to root(${p}) = ${i}. Size root(${p}) = ${this.size[j]}`);
        }
    }
}

function main() {
    const qf = new QuickUnionUF(10);
    qf.union(1, 2);
    qf.union(3, 4);
    qf.union(3, 5);
    qf.union(2, 3);
    qf.union(6, 7);
    qf.union(7, 8);
    qf.union(9, 0);
    qf.union(8, 9);
    qf.union(3, 6);

    //0 should have root 3 now!

    //Notice the change in id[i] after a root() call.
    //The tree is
    console.log(qf.id[0]);
    console.log(qf.id[9]);
    console.log(qf.id[6]);
    console.log(qf.id[3]);

    console.log("Calling root(0)");
    console.log(qf.root(0));
    console.log("After path compression: ");

    console.log(qf.id[0]);
    console.log(qf.id[9]);
    console.log(qf.id[6]);
    console.log(qf.id[3]);

    //Other elements remain as they were before
    console.log("Other elements remain as they were before");
    console.log(qf.id[8]);
}

main();
