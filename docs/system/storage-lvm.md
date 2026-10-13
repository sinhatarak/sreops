# Disks, Filesystems and LVM

LVM puts a flexible layer between disks and filesystems, so you can grow storage without downtime.

!!! warning
    `pvcreate` and `mkfs` destroy existing data. Check the device with `lsblk` first.

## Add a new disk with LVM

```bash
lsblk -f
sudo pvcreate /dev/sdb
sudo vgcreate vg_data /dev/sdb
sudo lvcreate -n lv_app -L 20G vg_data
sudo mkfs.xfs /dev/vg_data/lv_app

sudo mkdir -p /srv/app
sudo blkid /dev/vg_data/lv_app                       # note the UUID
echo 'UUID=<uuid>  /srv/app  xfs  defaults,nofail  0 0' | sudo tee -a /etc/fstab
sudo mount -a && df -hT /srv/app
```

Use the **UUID** in `/etc/fstab`, since device names can change. Always run `mount -a` after editing, or a typo can break the next boot.

## Grow a volume

```bash
sudo vgs                                              # free space in the group
sudo lvextend -r -L +10G /dev/vg_data/lv_app          # -r also grows the filesystem
```

XFS can grow but **cannot shrink**. ext4 can do both, with `resize2fs`.

## Health checks

```bash
df -h                  # space
df -i                  # inodes (a full inode table looks like a full disk)
lsblk
sudo lvs && sudo vgs && sudo pvs
```

For Kubernetes volumes see [Persistent Storage](../k8s/storage.md).
